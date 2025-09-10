import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HRLeaveDashboard() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/hr-leaves");
            setLeaves(res.data);
        } catch (err) {
            console.error("Error fetching leaves:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5001/api/hr-leaves/${id}/status`, { status });
            fetchLeaves();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "approved":
                return { background: "#d1fae5", color: "#065f46" };
            case "pending":
                return { background: "#fef3c7", color: "#92400e" };
            case "rejected":
                return { background: "#fee2e2", color: "#991b1b" };
            default:
                return { background: "#f3f4f6", color: "#374151" };
        }
    };

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <div style={{
                    border: "4px solid #ddd",
                    borderTop: "4px solid #3b82f6",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    animation: "spin 1s linear infinite"
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            padding: "30px",
            background: "linear-gradient(to bottom right, #eff6ff, #f5f3ff)",
            minHeight: "100vh",
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <h2 style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "20px",
                textAlign: "center"
            }}>
                Leave Requests
            </h2>

            <div style={{
                overflowX: "auto",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                backgroundColor: "white",
                animation: "fadeIn 0.8s ease-in-out"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                    color: "#374151"
                }}>
                    <thead style={{
                        background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                        color: "white"
                    }}>
                        <tr>
                            {["ID", "User ID", "User Type", "Leave Date", "Reason", "Status", "Type", "Actions"].map((heading, i) => (
                                <th key={i} style={{
                                    padding: "12px",
                                    textAlign: "left",
                                    fontWeight: "600"
                                }}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr
                                key={leave.id}
                                style={{
                                    transition: "background 0.3s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#f0f9ff"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                                <td style={{ padding: "12px" }}>{leave.id}</td>
                                <td style={{ padding: "12px" }}>{leave.user_id}</td>
                                <td style={{ padding: "12px" }}>{leave.user_type}</td>
                                <td style={{ padding: "12px" }}>{leave.leave_date}</td>
                                <td style={{ padding: "12px" }}>{leave.reason}</td>
                                <td style={{ padding: "12px" }}>
                                    <span style={{
                                        padding: "6px 12px",
                                        borderRadius: "9999px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        ...getStatusStyle(leave.status)
                                    }}>
                                        {leave.status}
                                    </span>
                                </td>
                                <td style={{ padding: "12px" }}>{leave.type}</td>
                                <td style={{ padding: "12px" }}>
                                    <select
                                        value={leave.status}
                                        onChange={(e) => updateStatus(leave.id, e.target.value)}
                                        style={{
                                            border: "1px solid #d1d5db",
                                            borderRadius: "8px",
                                            padding: "6px 8px",
                                            outline: "none",
                                            transition: "0.3s",
                                            cursor: "pointer"
                                        }}
                                        onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #3b82f6"}
                                        onBlur={(e) => e.target.style.boxShadow = "none"}
                                    >
                                        <option value="approved">Approved</option>
                                        <option value="pending">Pending</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
