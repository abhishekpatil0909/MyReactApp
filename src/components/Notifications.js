import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchNotifications();
        }
    }, [userId]);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/api/notifications/${userId}`);
            setNotifications(res.data);
        } catch (err) {
            console.error('Error fetching notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p style={{ textAlign: 'center' }}>Loading notifications...</p>;

    return (
        <div style={{ padding: '20px' , paddingInline: '120px'   , fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>
                Notifications
            </h2>
            {notifications.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No notifications found.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {notifications.map((notification, index) => (
                        <li
                            key={notification.id}
                            style={{
                                animation: `fadeIn 0.5s ease forwards`,
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0,
                                background: notification.is_read
                                    ? '#fff'
                                    : 'linear-gradient(135deg, #f9f9f9, #e8f5e9)',
                                margin: '15px 0',
                                padding: '20px',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                borderLeft: notification.is_read
                                    ? '5px solid #4CAF50'
                                    : '5px solid #f44336',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            }}
                        >
                            <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.1rem' }}>
                                {notification.title}
                            </h4>
                            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: 1.5 }}>
                                {notification.message}
                            </p>
                            <small style={{ color: '#999', fontSize: '0.85rem' }}>
                                {new Date(notification.created_at).toLocaleString()}
                            </small>
                        </li>
                    ))}
                </ul>
            )}

            {/* Animation keyframes */}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </div>
    );
}
