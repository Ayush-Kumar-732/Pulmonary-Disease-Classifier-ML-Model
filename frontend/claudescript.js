/* PulmoAI front-end interactions and placeholder prediction logic. */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('predictionForm');
  const resultCard = document.getElementById('resultCard');
  const predictButton = document.getElementById('predictButton');
  const energy = document.getElementById('energyLevel');
  const energyValue = document.getElementById('energyValue');
  const progress = document.getElementById('formProgress');
  const progressText = document.getElementById('formProgressText');

  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(el => new bootstrap.Tooltip(el));
  energy.addEventListener('input', () => { energyValue.textContent = energy.value; updateProgress(); });
  form.querySelectorAll('input, select').forEach(field => field.addEventListener('change', updateProgress));
  form.querySelectorAll('input[type="number"], select').forEach(field => field.addEventListener('input', updateProgress));

  function updateProgress() {
    const fields = [...form.querySelectorAll('input[required], select[required]')];
    const complete = fields.filter(field => field.value !== '').length;
    const value = Math.round((complete / fields.length) * 100);
    progress.style.width = `${value}%`;
    progressText.textContent = `${value}%`;
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      form.querySelector(':invalid').focus();
      return;
    }
    setLoading(true);
    try {
      const prediction = await predictDisease(getFormData());
      showResult(prediction);
    } catch (err) {
      showError(err.message || 'Something went wrong while contacting the prediction service.');
    } finally {
      setLoading(false);
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(() => { form.classList.remove('was-validated'); energyValue.textContent = '50'; resultCard.className = 'result-card d-none'; updateProgress(); }, 0);
  });

  function getFormData() {
    // Reading by element id keeps this demo flexible even before a backend schema is fixed.
    const ids = ['age', 'gender', 'smoking', 'fingerDiscoloration', 'mentalStress', 'pollution',
      'longTermIllness', 'energyLevel', 'immuneWeakness', 'breathingIssue', 'alcohol',
      'throatDiscomfort', 'oxygenSaturation', 'chestTightness', 'familyHistory',
      'smokingFamilyHistory', 'stressImmune'];
    return Object.fromEntries(ids.map(id => [id, document.getElementById(id).value]));
  }

  /**
   * Calls the Flask backend (see /backend/app.py), which loads the trained
   * Logistic Regression model from the notebook and returns a real prediction.
   * Update API_BASE_URL if the backend is hosted somewhere other than localhost.
   */
  const API_BASE_URL = 'http://127.0.0.1:5000';

  async function predictDisease(data) {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || `Prediction request failed (${response.status}).`);
    }
    return response.json(); // { detected, confidence, level }
  }

  function showError(message) {
    resultCard.className = 'result-card positive';
    resultCard.innerHTML = `<div class="d-flex gap-3 align-items-center"><div class="result-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div><h3>Prediction failed</h3><p>${message}</p></div></div>`;
  }

  function showResult({ detected, confidence, level }) {
    const label = detected ? 'Pulmonary Disease Detected' : 'No Pulmonary Disease Detected';
    const suggestion = detected ? 'Consult a healthcare professional for further evaluation.' : 'Maintain healthy habits and attend routine health check-ups.';
    const icon = detected ? 'fa-triangle-exclamation' : 'fa-circle-check';
    resultCard.className = `result-card ${detected ? 'positive' : 'negative'}`;
    resultCard.innerHTML = `<div class="d-flex gap-3 align-items-center"><div class="result-icon"><i class="fa-solid ${icon}"></i></div><div><h3>${label}</h3><p>${detected ? 'Your indicators suggest a possible risk signal.' : 'Your indicators suggest a lower risk signal.'}</p></div></div><div class="result-meta"><div>Confidence score<b>${confidence}%</b></div><div>Risk level<b>${level}</b></div><div>Suggested action<b>${suggestion}</b></div></div>`;
  }

  function setLoading(loading) {
    predictButton.disabled = loading;
    predictButton.querySelector('.button-label').classList.toggle('d-none', loading);
    predictButton.querySelector('.button-loading').classList.toggle('d-none', !loading);
  }

  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 25);
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  }));
});
