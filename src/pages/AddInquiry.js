import { useState } from "react";
import API from "../api/axios";

export default function AddInquiry() {
  const [form, setForm] = useState({
    name: "",
    std: "",
    mobileNumber: "",
    schoolCollege: "",
  });

  const submit = async () => {
    await API.post("/inquiry", form);
    alert("Inquiry Added");
  };

  return (
    <div style={styles.container}>
      <h2>Add Inquiry</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} style={styles.input} />
      <input placeholder="Std" onChange={(e) => setForm({ ...form, std: e.target.value })} style={styles.input} />
      <input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })} style={styles.input} />
      <input placeholder="School" onChange={(e) => setForm({ ...form, schoolCollege: e.target.value })} style={styles.input} />

      <button onClick={submit} style={styles.button}>Save Inquiry</button>
    </div>
  );
}

const styles = {
  container: {
    width: 400,
    margin: "50px auto",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 10,
    margin: 10,
    border: "1px solid #ddd"
  },
  button: {
    padding: 10,
    background: "green",
    color: "white",
    border: "none",
    width: "100%"
  }
};