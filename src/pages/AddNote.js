import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AddNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    note: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiry();
  }, []);

  const fetchInquiry = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/inquiry/${id}`);

      setForm((prev) => ({
        ...prev,
        status: res.data.status || "pending"
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    try {
      await API.post(`/inquiry/${id}/note`, form);

      alert("Note Added + Status Updated 🚀");
      navigate("/inquirylist");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div style={styles.container}>
      <h2>➕ Add Note</h2>

      <textarea
        placeholder="Enter follow-up note..."
        value={form.note}
        onChange={(e) =>
          setForm({ ...form, note: e.target.value })
        }
        style={styles.textarea}
      />

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
        style={styles.select}
      >
        <option value="pending">Pending</option>
        <option value="in_calling">In Calling</option>
        <option value="visited">Visited</option>
        <option value="admission">Admission</option>
        <option value="decline">Decline</option>
      </select>

      <button onClick={submit} style={styles.btn}>
        Save Note
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
  textarea: {
    width: "100%",
    height: 120,
    padding: 10,
    marginTop: 10,
    border: "1px solid #ddd"
  },
  select: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    border: "1px solid #ddd"
  },
  btn: {
    marginTop: 10,
    padding: 10,
    background: "green",
    color: "white",
    border: "none",
    width: "100%",
    cursor: "pointer"
  }
};