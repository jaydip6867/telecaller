import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [followupCount, setFollowupCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const role = localStorage.getItem("role");
      setUserRole(role);

      // 📅 always call followups count
      const followRes = await API.get("/inquiry/today-followups");
      setFollowupCount(followRes.data.length);

      // 👇 ONLY ADMIN CALL SECOND API
      if (role === "admin") {
        const userRes = await API.get("/inquiry/today-notes-by-user");
        setUserData(userRes.data);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">📊 CRM Dashboard</h1>

      {/* CARDS */}
      <div className="dashboard-cards">

        <a href="/inquirylist" className="card card-blue">
          📋 Inquiry List
        </a>

        <div
          className="card card-yellow"
          onClick={() => navigate("/today-followups")}
        >
          📅 Today Follow-ups
          <h2>{loading ? "..." : followupCount}</h2>
        </div>

      </div>

      {/* ================= ADMIN ONLY SECTION ================= */}
      {userRole === "admin" && (
        <div className="section">

          <h2 className="section-title">
            👤 Today Notes By User
          </h2>

          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : userData.length === 0 ? (
            <p className="loading-text">No data found</p>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Total Followups</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {userData.map((u) => (
                  <tr key={u.userId}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role}`}>
                        {u.role}
                      </span>
                    </td>

                    <td>
                      <span className="count-badge">
                        {u.totalNotesToday}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => openModal(u)}
                      >
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-box">

            {/* HEADER */}
            <div className="modal-header">
              <div>
                <h2>{selectedUser.name}</h2>
                <p>
                  {selectedUser.email} • Total Followups :
                  {" "}
                  {selectedUser.totalFollowups}
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              {selectedUser.notes.length === 0 ? (
                <p className="no-data">
                  No notes added today
                </p>
              ) : (
                <div className="followup-table-wrapper">

                  <table className="followup-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Inquiry Name</th>
                        <th>Contact</th>
                        <th>School</th>
                        <th>Note</th>
                        <th>Added At</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedUser.notes.map((item, index) => (
                        <tr key={index}>

                          <td>{index + 1}</td>

                          <td>
                            <div className="student-name-cell">
                              {item.inquiryName}
                            </div>
                          </td>

                          <td>
                            <a
                              href={`tel:${item.mobileNumber}`}
                              className="phone-link"
                            >
                              {item.mobileNumber}
                            </a>
                          </td>

                          <td>
                            {item.schoolCollege}
                          </td>

                          <td>
                            <div className="reason-cell">
                              {item.note}
                            </div>
                          </td>

                          <td>
                            {new Date(item.createdAt)
                              .toLocaleString("en-GB")}
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}