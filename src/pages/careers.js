import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import dayjs from "dayjs";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/careers")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "black" }}>
        <motion.div
          style={{
            width: "48px",
            height: "48px",
            border: "4px solid #ec4899",
            borderTop: "4px solid transparent",
            borderRadius: "50%"
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "black" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#d1d5db" }}
        >
          No job openings available 🚫
        </motion.h2>
        <p style={{ color: "#9ca3af", marginTop: "0.5rem" }}>Please check back later.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "3rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(135deg, black, #111827, black)" }}>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "2.5rem",
          backgroundImage: "linear-gradient(to right, #f472b6, #818cf8)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0px 2px 10px rgba(0,0,0,0.5)"
        }}
      >
        🚀 Career Opportunities
      </motion.h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1200px" }}>
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            style={{
              width: "220px",
              height: "260px",
              perspective: "1000px"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "transform 0.7s",
                transformStyle: "preserve-3d"
              }}
              className="card-inner"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotateY(180deg)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "rotateY(0deg)")}
            >
              {/* Front */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid #374151",
                  background: "linear-gradient(135deg, #111827, black)",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backfaceVisibility: "hidden"
                }}
              >
                <div>
                  <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "#f472b6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {job.job_title}
                  </h2>
                  <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    {job.department} • {job.location}
                  </p>
                  <p style={{ marginTop: "0.75rem", color: "#d1d5db", fontSize: "0.875rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                    {job.description}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>💼 {job.job_type}</p>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>💰 {job.salary_range}</p>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    📅 {dayjs(job.application_deadline).format("MMM D, YYYY")}
                  </p>
                </div>
              </div>

              {/* Back */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid #ec4899",
                  background: "linear-gradient(135deg, #db2777, #4f46e5)",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden"
                }}
              >
                <div>
                  <h2 style={{ fontSize: "1rem", fontWeight: "bold" }}>{job.job_title}</h2>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{job.description}</p>
                </div>
                <a
                  href={`mailto:${job.contact_email}`}
                  style={{
                    display: "block",
                    marginTop: "0.75rem",
                    padding: "0.5rem",
                    background: "white",
                    color: "#db2777",
                    fontWeight: "600",
                    textAlign: "center",
                    borderRadius: "8px",
                    textDecoration: "none"
                  }}
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
