# 🫁 Pulmonary Disease Classification using Machine Learning

A machine learning classification project that predicts **pulmonary disease** using demographic, lifestyle, environmental, and health-related features.

The project follows an end-to-end machine learning workflow covering **data preprocessing, exploratory data analysis, feature selection, model training, hyperparameter optimization, and model evaluation**.

> ⚠️ **Disclaimer:** This project is intended for educational purposes only. The model is not clinically validated and should not be used for medical diagnosis.

---

## 🚀 Project Overview:

This repository contains a complete pulmonary disease risk classifier — from data analysis to a live, deployed prediction tool.

The objective of this project is to investigate whether patient-related factors such as smoking, pollution exposure, respiratory symptoms, oxygen saturation, and other health indicators can be used to classify pulmonary disease.

Three classification algorithms were evaluated:

- Logistic Regression
- Decision Tree
- K-Nearest Neighbors (KNN)

Hyperparameter optimization was performed using:

- **Bayesian Optimization** for Logistic Regression
- **RandomizedSearchCV** for Decision Tree
- **GridSearchCV** for KNN

After comparing the models, **Logistic Regression** was selected as the final model because of its strong generalization, highest recall, and competitive overall performance.

The final build includes:

- Complete exploratory data analysis and preprocessing pipeline
- Three trained and compared classification models with hyperparameter tuning
- A Flask backend serving real-time predictions from the trained Logistic Regression model
- A responsive web interface for entering health indicators and receiving instant risk assessments
- Full deployment pipeline — live and publicly accessible

Unlike a static demo, every prediction shown on the live site is generated dynamically by the trained model based on the user's actual input — not hardcoded or simulated.

## 🔗 **Live demo:** 
https://pulmonary-disease-classifier-ml-model.onrender.com

---

## 📂 Project Structure

```
Pulmonary-Disease-Classifier-ML-Model/
|
├── frontend/
|   ├── index.html
|   ├── style.css
|   ├── jscript.js
|   └── favicon.svg                     # Browser tab icon
|
├── app.py                              # Flask backend — loads model, serves /predict
├── pulmo_logreg_model.joblib           # Trained Logistic Regression model
├── feature_order.json                  # Feature order expected by the model
├── requirements.txt                    # Python dependencies
├── lung data.csv                       # Raw dataset used for training
|
├── Pulmonary_Disease_Classification_project.ipynb   # Full EDA, preprocessing, model training & evaluation
├── README.md
└── .gitignore
```

---

## 🎯 Objectives:

- Perform data cleaning and preprocessing
- Analyze feature distributions and relationships
- Identify important predictive features
- Handle outliers and feature redundancy
- Train multiple classification models
- Optimize model hyperparameters
- Evaluate models using multiple classification metrics
- Compare model performance
- Select the most suitable final model

---

## 📊 Dataset

The dataset contains **5,000 observations and 18 features**, representing demographic characteristics, lifestyle factors, environmental exposure, symptoms, and health-related measurements.

## Target Variable
PULMONARY_DISEASE
- YES → 1
- NO  → 0

---

## 🔍 Exploratory Data Analysis:

The project includes univariate, bivariate, and multivariate analysis to understand the dataset and identify potentially useful relationships.

Key observations included:
* Smoking showed a strong association with pulmonary disease in the dataset.
* The combination of smoking and pollution exposure was associated with a higher occurrence of pulmonary disease.
* Breathing issues and throat discomfort showed noticeable differences between disease and non-disease groups.
* Oxygen saturation and energy level provided additional predictive information.
* Correlation analysis identified redundant relationships between some features.

Visualizations included:
* Target distribution
* Age distribution
* Oxygen saturation distribution
* Smoking distribution
* Smoking vs pulmonary disease
* Age and gender analysis
* Health-factor comparisons
* Correlation heatmap
* Pair plot
* Multivariate analysis

---

## 🧹 Data Preprocessing:

The following preprocessing steps were performed:
* Checked data types
* Checked missing values
* Checked duplicate records
* Encoded the target variable
* Detected outliers using the IQR method
* Removed extreme observations
* Removed highly redundant features
* Performed feature selection using Random Forest feature importance
* Split the dataset using an 80:20 stratified train-test split

## Final train-test dataset size:
- Training samples : 3,951
- Testing samples  : 988
---
## 🤖 Models Evaluated:

**1. Logistic Regression**

Used as the primary linear classification model.
Hyperparameters were optimized using Bayesian Optimization (BayesSearchCV).

**2. Decision Tree**

Used to capture nonlinear relationships between features.
Hyperparameters were optimized using RandomizedSearchCV.

**3. K-Nearest Neighbors**

Used as a distance-based classification approach.
Hyperparameters were optimized using GridSearchCV.

---
## 📈 Model Performance on test dataset:
| Model | Accuracy | Precision | Recall | F1-Score |
| :--- | :--- | :--- | :--- | :--- |
| Logistic Regression | 87.85% | 86.15% | 83.58% | 84.85% |
| Decision Tree | 87.96% | 86.56% | 83.33% | 84.92% |
| KNN | 76.32% | 71.76% | 68.91% | 70.30% |

---
## Key Takeaways:
* Logistic Regression and Decision Tree achieved almost similar test accuracy.
* Logistic Regression achieved the highest recall among the evaluated models and showed minimal evidence of overfitting.
* Decision Tree had a larger train-test accuracy gap showing mild overfitting.
* KNN achieved 100% training accuracy after tuning but only 76.32% test accuracy, indicating substantial overfitting.
* Logistic Regression provided the best overall balance between generalization, recall, and F1-score.
---
## 🏆 Final Model — Logistic Regression
Logistic Regression was selected as the final prediction model due to it's very small train-test gap (~0.13%) which indicates minimal evidence of overfitting compared with the Decision Tree and KNN models.
Recall was considered an important metric because false negatives represent positive cases that the model fails to identify in this classification task.

---

## 🔎 Important Features:

Feature importance analysis identified several influential variables, including:
* AGE
* SMOKING
* ENERGY_LEVEL
* OXYGEN_SATURATION
* THROAT_DISCOMFORT
* BREATHING_ISSUE
* ALCOHOL CONSUMPTION

These features contributed strongly to the classification patterns observed in the dataset.

Feature importance indicates predictive contribution within the model; it does not establish medical causation.

---

## 🛠️ Technologies Used:

**Programming**
- Python
- HTML, CSS, JavaScript

**Environment**
- Google Colab / Jupyter Notebook

**Dataset**
- Kaggle

**Data Analysis**
- Pandas
- NumPy
- Scikit-learn

**Data Visualization**
- Matplotlib
- Seaborn

**Machine Learning Models**
- Random Forest Classifier (for feature selection)
- Logistic Regression
- Decision Tree Classifier
- K Nearest Neighbors

**Hyperparameter Optimization**
- Scikit-Optimize
- BayesSearchCV
- RandomizedSearchCV
- GridSearchCV

**Backend & Deployment**
- Flask (REST API for serving predictions)
- Gunicorn (production WSGI server)
- Joblib (model serialization)
- Render (cloud hosting)
- Git & GitHub (version control)

---

## ⚙️ Run Locally:

**1. Clone the repository:**
```bash
   git clone https://github.com/Ayush-Kumar-732/Pulmonary-Disease-Classifier-ML-Model.git
   cd Pulmonary-Disease-Classifier-ML-Model
```

**2. (Optional but recommended) Create and activate a virtual environment:**
```bash
   python3 -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
```

**3. Install dependencies:**
```bash
   pip install -r requirements.txt
```

**4. Run the app:**
```bash
   python3 app.py
```
   *(If `python3` isn't recognized, try `python` or `py` instead, depending on your system.)*

**5. Open `http://127.0.0.1:5000` in your browser.**

---

## 👤 Author:

**Ayush Kumar**

   ~Machine Learning Project Creator

---

## 🙏 Acknowledgements:

- Dataset originally sourced from Kaggle (specific listing link no longer available)- the raw CSV file used for this project is included in this repository: [`lung data.csv`](./lung%20data.csv)
- Built as a personal project to practice end-to-end machine learning — from data analysis to a deployed, working web application


