import { useState } from "react";
import API from "../api/axios";

export default function UploadExcel() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await API.post("/inquiry/import-excel", formData);

    alert("Excel Uploaded Successfully");
  };

  return (
    <div style={styles.container}>
      <h2>Upload Inquiry Excel</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={styles.input} />

      <button onClick={upload} style={styles.button}>
        Upload
      </button>
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
    margin: 20
  },
  button: {
    padding: 10,
    background: "#ff9800",
    color: "white",
    border: "none",
    width: "100%"
  }
};