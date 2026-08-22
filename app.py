"""
PulmoAI backend
----------------
Loads the Logistic Regression model trained in the notebook and exposes
a single POST /predict endpoint that the existing script.js calls.

Run locally:
    pip install -r requirements.txt
    python app.py
Then open index.html (served by this same app at http://127.0.0.1:5000/).
"""

import json
from pathlib import Path

import joblib
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

BASE_DIR = Path(__file__).parent
MODEL_PATH = BASE_DIR / "pulmo_logreg_model.joblib"
FEATURES_PATH = BASE_DIR / "feature_order.json"
FRONTEND_DIR = BASE_DIR / "frontend"  # put index.html, style.css, script.js here

app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")
CORS(app)  # allow the page to call this API even if served from a different origin

# ---- Load model + feature order once at startup ----
model = joblib.load(MODEL_PATH)
with open(FEATURES_PATH) as f:
    FEATURE_ORDER = json.load(f)

# ---- Helpers: convert the webpage's form values into what the model expects ----

YES_NO = {"Yes": 1, "No": 0}
GENDER_MAP = {"Male": 1, "Female": 0}          # verify against your dataset's convention
LEVEL_TO_BINARY = {"Low": 0, "Medium": 1, "High": 1}  # MENTAL_STRESS / EXPOSURE_TO_POLLUTION were binary in training


def build_feature_row(payload: dict) -> list:
    """Map the JSON body sent by script.js to the model's expected feature vector,
    in the exact order the model was trained on."""
    values = {
        "AGE": float(payload["age"]),
        "GENDER": GENDER_MAP[payload["gender"]],
        "SMOKING": YES_NO[payload["smoking"]],
        "ALCOHOL_CONSUMPTION": YES_NO[payload["alcohol"]],
        "ENERGY_LEVEL": float(payload["energyLevel"]),
        "OXYGEN_SATURATION": float(payload["oxygenSaturation"]),
        "THROAT_DISCOMFORT": YES_NO[payload["throatDiscomfort"]],
        "BREATHING_ISSUE": YES_NO[payload["breathingIssue"]],
        "SMOKING_FAMILY_HISTORY": YES_NO[payload["smokingFamilyHistory"]],
        "IMMUNE_WEAKNESS": YES_NO[payload["immuneWeakness"]],
        "EXPOSURE_TO_POLLUTION": LEVEL_TO_BINARY[payload["pollution"]],
        "MENTAL_STRESS": LEVEL_TO_BINARY[payload["mentalStress"]],
        "LONG_TERM_ILLNESS": YES_NO[payload["longTermIllness"]],
        "CHEST_TIGHTNESS": YES_NO[payload["chestTightness"]],
        "FINGER_DISCOLORATION": YES_NO[payload["fingerDiscoloration"]],
        # NOTE: familyHistory & stressImmune are collected by the form but were
        # dropped before training (multicollinearity) -- intentionally unused here.
    }
    # Order matters: build the row using FEATURE_ORDER from the notebook, not dict order
    return [values[feat] for feat in FEATURE_ORDER]


def risk_level(probability: float) -> str:
    if probability >= 0.65:
        return "High"
    if probability >= 0.4:
        return "Moderate"
    return "Low"


@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json(force=True)
    try:
        row = build_feature_row(payload)
    except KeyError as e:
        return jsonify({"error": f"Missing or invalid field: {e}"}), 400

    probability_disease = model.predict_proba([row])[0][1]  # P(PULMONARY_DISEASE = 1)
    detected = bool(probability_disease >= 0.5)
    confidence = round((probability_disease if detected else 1 - probability_disease) * 100)

    return jsonify({
        "detected": detected,
        "confidence": confidence,
        "level": risk_level(probability_disease),
    })


# ---- Serve the front-end files (optional convenience so everything runs from one server) ----
@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
