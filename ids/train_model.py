import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Column names for NSL-KDD
columns = [
    "duration","protocol_type","service","flag","src_bytes","dst_bytes",
    "land","wrong_fragment","urgent","hot","num_failed_logins",
    "logged_in","num_compromised","root_shell","su_attempted",
    "num_root","num_file_creations","num_shells","num_access_files",
    "num_outbound_cmds","is_host_login","is_guest_login",
    "count","srv_count","serror_rate","srv_serror_rate",
    "rerror_rate","srv_rerror_rate","same_srv_rate",
    "diff_srv_rate","srv_diff_host_rate","dst_host_count",
    "dst_host_srv_count","dst_host_same_srv_rate",
    "dst_host_diff_srv_rate","dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate","dst_host_serror_rate",
    "dst_host_srv_serror_rate","dst_host_rerror_rate",
    "dst_host_srv_rerror_rate","label","difficulty"
]

# Load dataset
train = pd.read_csv("KDDTrain+.txt", names=columns)
test = pd.read_csv("KDDTest+.txt", names=columns)

# Convert label to binary
train["label"] = train["label"].apply(lambda x: "ATTACK" if x != "normal" else "NORMAL")
test["label"] = test["label"].apply(lambda x: "ATTACK" if x != "normal" else "NORMAL")

# Drop difficulty column
train = train.drop("difficulty", axis=1)
test = test.drop("difficulty", axis=1)

# Select only SDN-compatible features
train = train[["duration", "protocol_type", "src_bytes", "dst_bytes", "label"]]
test = test[["duration", "protocol_type", "src_bytes", "dst_bytes", "label"]]

# Map protocol to numeric (important)
protocol_map = {"tcp": 6, "udp": 17, "icmp": 1}

train["protocol_type"] = train["protocol_type"].map(protocol_map)
test["protocol_type"] = test["protocol_type"].map(protocol_map)

# Fill missing values (if any)
train = train.fillna(0)
test = test.fillna(0)

# Split features and labels
X_train = train.drop("label", axis=1)
y_train = train["label"]

X_test = test.drop("label", axis=1)
y_test = test["label"]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
accuracy = accuracy_score(y_test, preds)

print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "ids_model.pkl")

print("Model saved as ids_model.pkl")
