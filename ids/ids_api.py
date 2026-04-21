from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="AI-Powered IDS API")

# Load trained model
model = joblib.load("ids_model.pkl")

class TrafficFeatures(BaseModel):
    ip_proto: int
    frame_len: int

@app.post("/predict")
def predict(features: TrafficFeatures):
    data = np.array([[features.ip_proto, features.frame_len]])
    prediction = model.predict(data)[0]
    confidence = max(model.predict_proba(data)[0])

    return {
        "prediction": "NORMAL" if prediction == 0 else "SUSPICIOUS",
        "confidence": round(confidence, 3)
    }
