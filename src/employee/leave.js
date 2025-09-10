import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './leave.css';

const LeaveCalendar = ({ userId }) => {
  const [leaveDates, setLeaveDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [loading, setLoading] = useState(false);

  const fetchLeaveDates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5001/api/leaves?user_id=${userId}`);
      const data = res.data.map(entry => ({
        date: new Date(entry.leave_date),
        reason: entry.reason || 'No reason provided',
        status: entry.status || 'pending',
        type: entry.type || 'General',
      }));
      setLeaveDates(data);
    } catch (err) {
      console.error('Error fetching leave dates:', err);
      alert("Failed to load leave data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchLeaveDates();
  }, [userId]);

  const handleDateClick = (date) => {
    const isAlreadySelected = selectedDates.some(d => d.toDateString() === date.toDateString());
    const isAlreadyLeave = leaveDates.some(d => d.date.toDateString() === date.toDateString());

    if (isAlreadyLeave) {
      alert("Already marked as leave.");
      return;
    }

    if (isAlreadySelected) {
      setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setSelectedDates(prev => [...prev, date]);
    }
  };


  const handleSubmit = async () => {
    if (selectedDates.length === 0) {
      alert("Select at least one date.");
      return;
    }

    if (!leaveReason.trim()) {
      alert("Please provide a leave reason.");
      return;
    }

    const leavesToSubmit = selectedDates.map(date => ({
      user_id: userId,
      leave_date: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0],
      reason: leaveReason,
      type: leaveType,
    }));

    try {
      await axios.post('http://localhost:5001/api/leaves/apply', { leaves: leavesToSubmit });
      alert("Leave applied successfully.");
      setSelectedDates([]);
      setLeaveReason('');
      setLeaveType('Sick Leave');
      fetchLeaveDates();
    } catch (err) {
      console.error('Error applying leave:', err);
      alert("Failed to apply leave.");
    }
  };

  // if leave applied disable button
  const isApplyDisabled =
  selectedDates.length === 0 ||
  selectedDates.every(date =>
    leaveDates.some(d => d.date.toDateString() === date.toDateString())
  ) ||
  !leaveReason.trim();

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) return 'highlight-today';

    const leave = leaveDates.find(d => d.date.toDateString() === date.toDateString());
    if (leave) {
      if (leave.status.toLowerCase() === 'approved') return 'highlight-approved';
      if (leave.status.toLowerCase() === 'pending') return 'highlight-pending';
    }

    if (selectedDates.some(d => d.toDateString() === date.toDateString())) {
      return 'highlight-selected';
    }

    return null;
  };

 
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const leave = leaveDates.find(d => d.date.toDateString() === date.toDateString());
    return leave ? (
      <div className="tooltip">
        📌
        <span className="tooltiptext">
          <span className={`leave-type-badge ${leave.type?.toLowerCase().replace(/\s+/g, '-')}`}>
            {leave.type}
          </span>{' '}
          - {leave.reason} ({leave.status})
        </span>
      </div>
    ) : null;
  };

  return (
    <div className="leave-calendar-container">
      <div className="calendar-card">
        <h2>🗓️ Leave Calendar</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Calendar
              onClickDay={handleDateClick}
              tileClassName={tileClassName}
              tileContent={tileContent}
            />

            <select
              className="leave-type-dropdown"
              value={leaveType}
              onChange={e => setLeaveType(e.target.value)}
            >
              <option value="" disabled selected hidden>Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation">Vacation</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Work From Home">Work From Home</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              className="reason-textarea"
              placeholder="Enter reason for leave"
              value={leaveReason}
              onChange={e => setLeaveReason(e.target.value)}
            />

              <button
  className={`submit-leave-btn ${isApplyDisabled ? 'disabled' : ''}`}
  onClick={handleSubmit}
  disabled={isApplyDisabled}
>
  Apply Leave
</button>

          </>
        )}
      </div>
    </div>
  );
};

export default LeaveCalendar;
