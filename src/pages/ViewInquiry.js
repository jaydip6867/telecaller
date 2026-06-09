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
    <div className="inquiry-details-page">

      {/* Header Card */}
      <div className="profile-card">
        <div className="avatar">
          {data.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <h2>{data.name}</h2>
          <span className={`status-badge_view ${data.status}`}>
            {data.status?.replaceAll("_", " ").toUpperCase()}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="details-grid">

        <div className="info-card">
          <h3>📱 Contact Details</h3>

          <div className="info-row">
            <span>Mobile</span>
            <strong>{data.mobileNumber}</strong>
          </div>

          {data.parentMobile && (
            <div className="info-row">
              <span>Parent Mobile</span>
              <strong>{data.parentMobile}</strong>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>🎓 Academic Details</h3>

          <div className="info-row">
            <span>Standard</span>
            <strong>{data.std}</strong>
          </div>

          <div className="info-row">
            <span>School</span>
            <strong>{data.schoolCollege}</strong>
          </div>
        </div>

      </div>

      {/* Timeline */}
      <div className="notes-section">
        <h3>📝 Follow-up Notes</h3>

        {data.notes?.length ? (
          <div className="notes-grid">

            {data.notes
              .slice()
              .reverse()
              .map((note, index) => (
                <div className="note-card" key={index}>

                  <div className="note-header">
                    <div className="note-avatar">
                      {(note.addedBy?.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h4>
                        {note.addedBy?.name || "User"}
                      </h4>

                      <span>
                        {new Date(
                          note.createdAt
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="note-body">
                    {note.note}
                  </div>

                </div>
              ))}

          </div>
        ) : (
          <div className="empty-notes">
            No Follow-up Notes Available
          </div>
        )}
      </div>

    </div>
  );
}