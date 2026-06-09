export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1>Telecaller CRM Dashboard</h1>

      <div style={styles.grid}>
        {/* <a href="/addinquiry" style={styles.card}>➕ Add Inquiry</a> */}
        <a href="/inquirylist" style={styles.card}>📋 Inquiry List</a>
        {/* <a href="/uploadinquiry" style={styles.card}>📤 Upload Excel</a> */}
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
    width: 180,
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
  }
};