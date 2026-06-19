import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight, FaPlus, FaRegEye, FaWhatsapp } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function InquiryList() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [selectedInquiryId, setSelectedInquiryId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await API.get("/inquiry");
            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState("all");
    const [schoolFilter, setSchoolFilter] = useState("all");
    const [stdFilter, setStdFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    // filter schools for dropdown
    const schoolOptions = [
        ...new Set(
            data
                .map((item) => item.schoolCollege)
                .filter(Boolean)
        ),
    ];

    // 1. Filtering
    const filteredData = data.filter((item) => {
        const statusMatch =
            statusFilter === "all" || item.status === statusFilter;

        const schoolMatch =
            schoolFilter === "all" || item.schoolCollege === schoolFilter;

        const stdMatch =
            stdFilter === "all" || item.std === stdFilter; // 👈 NEW FILTER

        const searchMatch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.mobileNumber?.includes(search) ||
            item.schoolCollege?.toLowerCase().includes(search.toLowerCase());

        return statusMatch && schoolMatch && stdMatch && searchMatch;
    });

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

    // fing pagination numbers 
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else {
                pages.push(
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    "...",
                    totalPages
                );
            }
        }

        return pages;
    };

    // tution model code
    const [showModal, setShowModal] = useState(false);
    const [tuitionName, setTuitionName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await API.post(
                `/inquiry/${selectedInquiryId}`,
                {
                    tution: tuitionName
                }
            );

            await fetchData();

            setTuitionName("");
            setSelectedInquiryId(null);
            setShowModal(false);

        } catch (error) {
            console.error(error);
            alert("Failed to update tuition");
        }
    };

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
            <div className="filter-container">

                {/* SEARCH */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search name / mobile / school..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <span>🔍</span>
                </div>

                {/* STATUS BUTTONS */}
                <div className="status-pills">
                    {["all", "pending", "visited", "in_calling", "admission", "decline"].map((st) => (
                        <button
                            key={st}
                            className={statusFilter === st ? "active" : ""}
                            onClick={() => {
                                setStatusFilter(st);
                                setCurrentPage(1);
                            }}
                        >
                            {st.replaceAll("_", " ")}
                        </button>
                    ))}
                </div>

                {/* SCHOOL */}
                <select
                    className="dropdown"
                    value={schoolFilter}
                    onChange={(e) => {
                        setSchoolFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All Schools</option>
                    {schoolOptions.map((school) => (
                        <option key={school} value={school}>
                            {school}
                        </option>
                    ))}
                </select>

                {/* std */}
                <select
                    className="dropdown"
                    value={stdFilter}
                    onChange={(e) => {
                        setStdFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All Std</option>

                    {[...new Set(data.map((item) => item.std).filter(Boolean))].map((std) => (
                        <option key={std} value={std}>
                            {std}
                        </option>
                    ))}
                </select>

                {/* ROWS */}
                <select
                    className="dropdown small"
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

                {/* CLEAR ALL */}
                <button
                    className="clear-btn"
                    onClick={() => {
                        setSearch("");
                        setStatusFilter("all");
                        setSchoolFilter("all");
                        setRowsPerPage(10);
                        setCurrentPage(1);
                        setStdFilter("all");
                    }}
                >
                    Clear
                </button>

            </div>
            <div className="filter-info">
                <div className="active-filters">
                    {search && (
                        <span onClick={() => setSearch("")}>
                            Search: {search} ✕
                        </span>
                    )}

                    {statusFilter !== "all" && (
                        <span onClick={() => setStatusFilter("all")}>
                            Status: {statusFilter} ✕
                        </span>
                    )}

                    {schoolFilter !== "all" && (
                        <span onClick={() => setSchoolFilter("all")}>
                            School: {schoolFilter} ✕
                        </span>
                    )}
                </div>
                <h4>{currentData.length} Inquiries</h4>
            </div>
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {currentData.length === 0 ? (
                        <h3 style={{ marginTop: 50, textAlign: "center" }}>
                            No inquiries found.
                        </h3>
                    ) : (
                        <>
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
                                                    {/* <button
                                                        className="action-btn view"
                                                        onClick={() =>
                                                            navigate(`/inquiry/${item._id}`)
                                                        }
                                                    >
                                                        <FaRegEye /> {item.notes?.length || 0}
                                                    </button> */}
                                                    <Link to={`/add-note/${item._id}`} className="action-btn add" target="_blank"><FaPlus /></Link>
                                                    {/* <button
                                                        className="action-btn add"
                                                        onClick={() =>
                                                            navigate(`/add-note/${item._id}`)
                                                        }
                                                    >
                                                        <FaPlus />
                                                    </button> */}
                                                    <button
                                                        className="action-btn edit"
                                                        disabled={!!item.tution?.trim()}
                                                        onClick={() => {
                                                            setSelectedInquiryId(item._id);
                                                            setTuitionName(item.tution || "");
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        Add Tution
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="pagination-container">

                                {/* First */}
                                <button
                                    className="page-btn"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    <FaAnglesLeft />
                                </button>

                                {/* Previous */}
                                <button
                                    className="page-btn"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    <FaAngleLeft />
                                </button>

                                {getPageNumbers().map((page, index) =>
                                    page === "..." ? (
                                        <span key={index} className="dots">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={index}
                                            className={`page-btn ${currentPage === page ? "active" : ""
                                                }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                {/* Next */}
                                <button
                                    className="page-btn"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    <FaAngleRight />
                                </button>

                                {/* Last */}
                                <button
                                    className="page-btn"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    <FaAnglesRight />
                                </button>

                            </div>
                        </>
                    )}
                </>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Add Tuition</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Add Tuition</label>
                                <input
                                    type="text"
                                    placeholder="Enter tuition name"
                                    value={tuitionName}
                                    onChange={(e) => setTuitionName(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
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