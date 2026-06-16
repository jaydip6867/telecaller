import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    note: "",
    status: "pending",
    followUpDate: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/inquiry/${id}`);

        setForm({
          note: "",
          status: res.data.status || "pending",
          followUpDate: res.data.followUpDate
            ? res.data.followUpDate.substring(0, 10)
            : ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const submit = async () => {
    try {
      const payload = {
        note: form.note,
        status: form.status,
        followUpDate: form.followUpDate || null
      };

      await API.post(`/inquiry/${id}/note`, payload);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Note + FollowUp updated 🚀",
        timer: 2000,
        showConfirmButton: false
      });

      navigate("/inquirylist");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        timer: 2000
      });
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="add-note-page">
      <div className="add-note-card">

        <div className="header">
          <h2><FaPlus /> Add Follow-up Note</h2>
          <p>Update status, note & follow-up date</p>
        </div>

        <textarea
          placeholder="Write follow-up note..."
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
          className="textarea"
        />

        <input
          type="date"
          value={form.followUpDate}
          onChange={(e) =>
            setForm({ ...form, followUpDate: e.target.value })
          }
          className="input"
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

        <button onClick={submit} className="submit-btn">
          Save Note
        </button>

      </div>
    </div>
  );
}