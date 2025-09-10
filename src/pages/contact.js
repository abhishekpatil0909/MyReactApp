import React, { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/contact-us", formData)
      .then(() => {
        alert("Message sent!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: ""
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "20px",
        boxSizing: "border-box",
        // background: "#f8f9fa"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          background: "linear-gradient(135deg, #1913d4ff, #ea947cff)",
          borderRadius: "25px",
          boxShadow: "0px 12px 40px rgba(0,0,0,0.2)",
          padding: "50px 60px",
          width: "100%",
          maxWidth: "1100px",
          animation: "fadeIn 0.8s ease",
          color: "#fff",
          transition: "0.3s"
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.boxShadow = "0px 16px 50px rgba(0,0,0,0.3)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.boxShadow = "0px 12px 40px rgba(0,0,0,0.2)")
        }
      >
        {/* Left Side - Company Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            animation: "slideInLeft 0.8s ease"
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "15px" }}>📞 Contact Us</h2>
          <p style={{ fontSize: "16px", marginBottom: "20px" }}>
            Have questions? Reach out and we’ll be happy to help!
          </p>
          <div style={{ lineHeight: "2", fontSize: "16px" }}>
            <p><strong>🏢 Company:</strong> WebicSoft India Pvt Ltd</p>
            <p><strong>📍 Address:</strong> 123, Navle Bridge, Pune</p>
            <p><strong>📧 Email:</strong> contact@webicsoft.com</p>
            <p><strong>📞 Phone:</strong> +91 9876543210</p>
            <p><strong>🕒 Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            animation: "slideInRight 0.8s ease"
          }}
        >
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required style={inputStyle} />
          <select name="subject" value={formData.subject} onChange={handleChange} required style={inputStyle}>
            <option value="">Select Subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Partnership">Partnership</option>
            <option value="Careers">Careers</option>
            <option value="Complaint">Complaint</option>
          </select>
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required style={{ ...inputStyle, height: "100px" }} />
          <button
            type="submit"
            style={{
              background: "#fff",
              color: "#3c70bdff",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "0.3s"
            }}
            onMouseOver={(e) => (e.target.style.background = "#f1f1f1")}
            onMouseOut={(e) => (e.target.style.background = "#fff")}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
          @keyframes slideInLeft {
            from {opacity: 0; transform: translateX(-30px);}
            to {opacity: 1; transform: translateX(0);}
          }
          @keyframes slideInRight {
            from {opacity: 0; transform: translateX(30px);}
            to {opacity: 1; transform: translateX(0);}
          }
        `}
      </style>
    </div>
  );
}

// Bigger Input Style
const inputStyle = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  outline: "none",
  fontSize: "15px",
  background: "#fff",
  color: "#333"
};
