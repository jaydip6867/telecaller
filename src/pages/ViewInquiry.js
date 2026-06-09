import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function ViewInquiry() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchInquiry = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get(`/inquiry/${id}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInquiry();
  }, [fetchInquiry]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data) {
    return <h3>No Data Found</h3>;
  }

  return (
    <div style={styles.container}>
      <h2>📄 Inquiry Details</h2>

      {/* BASIC INFO */}
      <div style={styles.card}>
        <p><b>Name:</b> {data.name}</p>
        <p><b>Std:</b> {data.std}</p>
        <p><b>Mobile:</b> {data.mobileNumber}</p>
        <p><b>School:</b> {data.schoolCollege}</p>
      </div>

      {/* NOTES SECTION */}
      <h3>📝 Follow-up Notes</h3>

      {data.notes && data.notes.length > 0 ? (
        data.notes.map((note, index) => (
          <div key={index} style={styles.note}>
            <p>{note.note}</p>
            <small>
              👤 {note.addedBy?.name || "User"} |{" "}
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20
  },
  card: {
    padding: 15,
    border: "1px solid #ddd",
    marginBottom: 20,
    borderRadius: 8
  },
  note: {
    padding: 10,
    marginBottom: 10,
    borderLeft: "4px solid green",
    background: "#f9f9f9"
  }
};