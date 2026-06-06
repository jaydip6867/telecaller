import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  useEffect(() => {
  if (localStorage.getItem("token")) {
    window.location.href = "/dashboard";
  }
}, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Telecaller Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />

        <button onClick={login} style={styles.button}>Login</button>

        {/* <p>
          New user? <a href="/register">Register</a>
        </p> */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  card: {
    padding: 30,
    background: "white",
    borderRadius: 10,
    width: 300,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: 5
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
};