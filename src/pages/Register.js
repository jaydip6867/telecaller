import { useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "telecaller" // default
  });

  const register = async () => {
    try {
      await API.post("/auth/register", form);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration Success 🎉",
        confirmButtonColor: "#2563eb",
        timer: 2000,
      });

      // login page par redirect
      window.location.href = "/";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Error",
        confirmButtonColor: "#dc2626",
        timer: 2000,
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register User</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={styles.input}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={styles.input}
      />

      {/* Role (optional dropdown) */}
      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        style={styles.input}
      >
        <option value="telecaller">Telecaller</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={register} style={styles.button}>
        Register
      </button>

      <p>
        Already have account?{" "}
        <a href="/">Login</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "center"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};