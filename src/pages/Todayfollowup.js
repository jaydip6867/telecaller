import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaPlus, FaRegEye, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TodayFollowup() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await API.get("/inquiry/today-followups");

            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={styles.container}>
            <h2>📅 Today Follow-ups</h2>

            {loading ? (
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    Loading...
                </div>
            ) : (
                <>
                    {data.length === 0 ? (
                        <h3 style={{ marginTop: 50, textAlign: "center" }}>
                            No follow-ups for today.
                        </h3>
                    ) : (
                        <table className="inquiry-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Student Details</th>
                                    <th>School</th>
                                    <th>Tution Course</th>
                                    <th>Remark</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>
                                            {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                        </td>

                                        <td>
                                            <div className="student-cell">
                                                <div className="student-name">{item.name}</div>

                                                <div className="mobile-row">
                                                    <a href={`tel:${item.mobileNumber}`}>
                                                        {item.mobileNumber}
                                                    </a>

                                                    <a
                                                        href={`https://wa.me/91${item.mobileNumber}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="whatsapp-btn"
                                                    >
                                                        <FaWhatsapp />
                                                    </a>
                                                </div>

                                                {item.parentMobile && (
                                                    <div className="mobile-row">
                                                        <a href={`tel:${item.parentMobile}`}>
                                                            {item.parentMobile}
                                                        </a>

                                                        <a
                                                            href={`https://wa.me/91${item.parentMobile}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="whatsapp-btn"
                                                        >
                                                            WhatsApp
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td>{item.schoolCollege}</td>
                                        <td align="center">
                                            {item.tution || "-"}
                                        </td>
                                        <td>

                                            <div className="remark-cell">
                                                {item.notes?.length ? (
                                                    <>
                                                        <div>{item.notes[item.notes.length - 1].note}</div>
                                                        <div className="remark-date">
                                                            {new Date(
                                                                item.notes[item.notes.length - 1].createdAt
                                                            ).toLocaleDateString("en-GB")}
                                                        </div>
                                                    </>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={`status-badge ${item.status}`}
                                            >
                                                {item.status
                                                    .replaceAll("_", " ")
                                                    .toUpperCase()}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="action-column">

                                                <Link to={`/inquiry/${item._id}`} className="action-btn view" target="_blank"><FaRegEye /> {item.notes?.length || 0}</Link>

                                                <Link to={`/add-note/${item._id}`} className="action-btn add" target="_blank"><FaPlus /></Link>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: 20
    }
};