import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [followupCount, setFollowupCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        setLoading(true);
        const res = await API.get("/inquiry");

        const today = new Date().toISOString().split("T")[0];

        const count = res.data.filter((item) => {
          if (!item.followUpDate) return false;
          return item.followUpDate?.substring(0, 10) === today;
        }).length;

        setFollowupCount(count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowups();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Telecaller CRM Dashboard</h1>

      <div style={styles.grid}>

        {/* Inquiry List */}
        <a href="/inquirylist" style={styles.card}>
          📋 Inquiry List
        </a>

        {/* Today Followups */}
        <div
          style={{ ...styles.card, cursor: "pointer", background: "#fef3c7" }}
          onClick={() => navigate("/inquirylist?filter=today")}
        >
          📅 Today's Follow-ups
          <h2 style={{ marginTop: 10 }}>{loading ? "..." : followupCount}</h2>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: "center"
  },
  grid: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    marginTop: 40
  },
  card: {
    padding: 30,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 10,
    textDecoration: "none",
    color: "#000",
    width: 200,
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  }
};