import { useState } from "react";
import API from "../api/axios";
import { FaFileExcel, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UploadExcel() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select an Excel file",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await API.post("/inquiry/import-excel", formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Excel Uploaded Successfully",
        confirmButtonColor: "#2563eb",
        timer: 2000,
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Upload Failed",
        confirmButtonColor: "#dc2626",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <FaFileExcel size={70} color="#1D6F42" />

        <h2 style={styles.title}>Upload Inquiry Excel</h2>

        <p style={styles.subtitle}>
          Select an Excel file (.xlsx, .xls) to import inquiries
        </p>

        <label style={styles.uploadBox}>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />

          <FaUpload size={28} color="#1976d2" />

          <p style={{ marginTop: 10 }}>
            {file ? file.name : "Choose Excel File"}
          </p>
        </label>

        <button
          onClick={upload}
          disabled={loading}
          style={styles.button}
        >
          {loading ? (
            <div style={styles.loader}></div>
          ) : (
            "Upload Excel"
          )}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7fb",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 500,
    background: "#fff",
    borderRadius: 20,
    padding: 35,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    marginTop: 15,
    marginBottom: 10,
    color: "#222",
  },

  subtitle: {
    color: "#666",
    marginBottom: 25,
  },

  uploadBox: {
    border: "2px dashed #1976d2",
    borderRadius: 15,
    padding: "35px 20px",
    cursor: "pointer",
    background: "#f8fbff",
    marginBottom: 25,
    display: "block",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: 12,
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  loader: {
  width: "22px",
  height: "22px",
  border: "3px solid rgba(255,255,255,0.4)",
  borderTop: "3px solid #fff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto",
},
};