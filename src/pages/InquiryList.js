import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function InquiryList() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await API.get("/inquiry");
        setData(res.data);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);



    // 1. Filtering
    const filteredData =
        statusFilter === "all"
            ? data
            : data.filter(
                (item) => item.status === statusFilter
            );

    // 2. Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const currentData = filteredData.slice(
        indexOfFirstRow,
        indexOfLastRow
    );

    const totalPages = Math.ceil(
        filteredData.length / rowsPerPage
    );
    return (
        <div style={styles.container}>
            <h2>📋 Inquiry List</h2>

            {/* <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Std</th>
                        <th>Mobile</th>
                        <th>School</th>
                        <th>Notes Count</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.std}</td>
                            <td>{item.mobileNumber}</td>
                            <td>{item.schoolCollege}</td>
                            <td>{item.notes?.length || 0}</td>

                            <td>
                                <button
                                    style={{ marginRight: 10 }}
                                    onClick={() => navigate(`/inquiry/${item._id}`)}
                                >
                                    👁 View
                                </button>

                                <button
                                    style={styles.btn}
                                    onClick={() => navigate(`/add-note/${item._id}`)}
                                >
                                    ➕ Add Note
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <select
                value={rowsPerPage}
                onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
            >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="visited">Visited</option>
                <option value="in_calling">In Calling</option>
                <option value="admission">Admission</option>
                <option value="in_follow_up">
                    In Follow Up
                </option>
            </select>
            <table className="inquiry-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Student Details</th>
                        <th>Follow Up</th>
                        <th>School</th>
                        <th>Remark</th>
                        <th>Staff</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {currentData.map((item, index) => (
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
                                            WhatsApp
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

                            <td>
                                {item.followUpDate
                                    ? new Date(item.followUpDate).toLocaleDateString(
                                        "en-GB"
                                    )
                                    : "-"}
                            </td>

                            <td>{item.schoolCollege}</td>

                            <td>
                                <div className="remark-cell">
                                    {item.notes?.[item.notes.length - 1]?.note || "-"}
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
                                {/* <div>{item.staffName}</div> */}
                                {/* <div className="visited-text">{item.status}</div> */}
                            </td>

                            <td>
                                <div className="action-column">
                                    <button
                                        className="action-btn edit"
                                        onClick={() =>
                                            navigate(`/inquiry/${item._id}`)
                                        }
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className="action-btn view"
                                        onClick={() =>
                                            navigate(`/inquiry/${item._id}`)
                                        }
                                    >
                                        👁 {item.notes?.length || 0}
                                    </button>

                                    <button
                                        className="action-btn add"
                                        onClick={() =>
                                            navigate(`/add-note/${item._id}`)
                                        }
                                    >
                                        ➕
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={
                            currentPage === index + 1
                                ? "active-page"
                                : ""
                        }
                        onClick={() =>
                            setCurrentPage(index + 1)
                        }
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: 20
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 20,
        textAlign: "left"
    },
    btn: {
        padding: "5px 10px",
        background: "green",
        color: "white",
        border: "none",
        cursor: "pointer"
    }
};