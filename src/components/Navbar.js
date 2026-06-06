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
      <h3>📊 Telecaller CRM</h3>

      <div style={styles.links}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        {/* <button onClick={() => navigate("/addinquiry")}>Add Inquiry</button> */}
        <button onClick={() => navigate("/inquirylist")}>Inquiry List</button>
        <button onClick={() => navigate("/uploadinquiry")}>Upload Excel</button>

        <button onClick={logout} style={styles.logout}>
          Logout 🚪
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
    padding: 15,
    background: "#007bff",
    color: "white"
  },
  links: {
    display: "flex",
    gap: 10
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};