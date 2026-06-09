import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FaPlus } from "react-icons/fa";

export default function AddNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    note: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchInquiry();
  }, [id]);


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
  <div className="add-note-page">

    <div className="add-note-card">

      <div className="header">
        <h2><FaPlus /> Add Follow-up Note</h2>
        <p>Update inquiry status & add remarks</p>
      </div>

      <textarea
        placeholder="Write follow-up note here..."
        value={form.note}
        onChange={(e) =>
          setForm({ ...form, note: e.target.value })
        }
        className="textarea"
      />

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
        className="select"
      >
        <option value="pending">Pending</option>
        <option value="in_calling">In Calling</option>
        <option value="visited">Visited</option>
        <option value="admission">Admission</option>
        <option value="decline">Decline</option>
      </select>

      <button
        onClick={submit}
        className="submit-btn"
      >
        Save Note
      </button>

    </div>

  </div>
);
}
