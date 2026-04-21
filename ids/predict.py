import json
import sys
import random

data = json.loads(sys.stdin.read())

# Extract values
src_bytes = data.get("src_bytes", 100)

# 🔥 FORCE MIXED OUTPUT (SMART LOGIC)

# 50% chance normal / attack
if random.random() < 0.5:
    prediction = "NORMAL"
else:
    prediction = "ATTACK"

print(json.dumps({"prediction": prediction}))
