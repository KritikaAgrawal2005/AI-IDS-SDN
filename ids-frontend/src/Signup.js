import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        email,
        password
      });

      alert(res.data.message);
      window.location.href = "/";

    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #020617, #0f172a)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>

      <div style={{
        background: "#020617",
        padding: "40px",
        borderRadius: "16px",
        width: "350px",
        boxShadow: "0 0 30px rgba(34,197,94,0.2)",
        border: "1px solid rgba(34,197,94,0.2)"
      }}>

        <h2 style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#22c55e"
        }}>
          🧠 Create Account
        </h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSignup} style={buttonStyle}>
          Signup
        </button>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#94a3b8" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#22c55e", cursor: "pointer" }}
            onClick={() => window.location.href = "/"}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #1e293b",
  background: "#0f172a",
  color: "white",
  outline: "none",
  boxSizing: "border-box",
  display: "block"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(90deg, #22c55e, #4ade80)",
  border: "none",
  borderRadius: "8px",
  color: "#020617",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Signup;
