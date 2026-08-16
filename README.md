# 🫁 Pulmonary Disease Classification using Machine Learning

A machine learning classification project that predicts **pulmonary disease** using demographic, lifestyle, environmental, and health-related features.

The project follows an end-to-end machine learning workflow covering **data preprocessing, exploratory data analysis, feature selection, model training, hyperparameter optimization, and model evaluation**.

> ⚠️ **Disclaimer:** This project is intended for educational purposes only. The model is not clinically validated and should not be used for medical diagnosis.

---

## 📌 Project Overview

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

---

## 🎯 Objectives

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

## 🔍 Exploratory Data Analysis

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

## 🧹 Data Preprocessing

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
## 🤖 Models Evaluated

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

## 🔎 Important Features

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
* Python

**Environment**
* Google Colab / Jupyter Notebook

**Dataset**
* Kaggle

**Data Analysis**
* Pandas
* NumPy
* Scikit-learn

**Data Visualization**
* Matplotlib
* Seaborn

**Machine Learning Models**
* Random Forest Classifier(for feature selection)
* Logistic Regression
* Decision Tree Classifier
* K Nearest Neighbors

**Hyperparameter Optimization**
* Scikit-Optimize
* BayesSearchCV
* RandomizedSearchCV
* GridSearchCV


