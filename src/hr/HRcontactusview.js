// HRContactUsView.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function HRContactUsView() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/contact-us");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    }
  };

  const handleDownload = () => {
    const filteredMessages = messages.filter((msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.mobile && msg.mobile.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const worksheet = XLSX.utils.json_to_sheet(filteredMessages);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ContactUs");
    XLSX.writeFile(workbook, "ContactUsData.xlsx");
  };

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (msg.mobile && msg.mobile.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📩 Contact Us Messages</h2>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />
        <button style={styles.downloadBtn} onClick={handleDownload}>
          ⬇ Download Excel
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Mobile</th>
              <th style={styles.th}>Subject</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <tr
                  key={msg.id}
                  style={{
                    ...styles.tr,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <td style={styles.td}>{msg.id}</td>
                  <td style={styles.td}>{msg.name}</td>
                  <td style={styles.td}>{msg.email}</td>
                  <td style={styles.td}>{msg.mobile || "—"}</td>
                  <td style={styles.td}>{msg.subject || "—"}</td>
                  <td style={styles.td}>{msg.message}</td>
                  <td style={styles.td}>
                    {new Date(msg.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.noData}>
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(135deg, #3f2b96 0%, #a8c0ff 100%)",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  search: {
    padding: "10px 15px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    width: "250px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  downloadBtn: {
    background: "#ff9800",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  tableContainer: {
    overflowX: "auto",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "rgba(0,0,0,0.3)",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    color: "#fff",
  },
  tr: {
    animation: "fadeInRow 0.5s ease forwards",
  },
  td: {
    padding: "10px",
    background: "rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
    color: "#ddd",
  },
};
