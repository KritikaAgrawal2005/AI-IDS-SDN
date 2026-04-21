import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load data
df = pd.read_csv("features.csv")
df = df.dropna()

# Labels
df["label"] = df["ip.proto"].apply(lambda x: 0 if x == 1 else 1)

X = df[["ip.proto", "frame.len"]]
y = df["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Accuracy
acc = accuracy_score(y_test, model.predict(X_test))
print("Model accuracy:", acc)

# Save model
joblib.dump(model, "ids_model.pkl")
print("✅ Model saved as ids_model.pkl")
