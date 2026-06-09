import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  if (!token) return null; // login page par header na dekhay

  return (
    <div style={styles.navbar}>
      <h3>Telecaller CRM</h3>

      <div style={styles.links}>
        <button
          style={styles.navBtn}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          style={styles.navBtn}
          onClick={() => navigate("/inquirylist")}
        >
          Inquiry List
        </button>

        <button
          onClick={logout}
          style={styles.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    background: "linear-gradient(135deg, #003366, #00509d)",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  navBtn: {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },

  logout: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(229,57,53,0.3)",
  },
};