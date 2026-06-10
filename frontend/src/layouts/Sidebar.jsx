import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar({
  isMobile,
  sidebarOpen
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  return (
    <div
     style={{
  width: "280px",
  background: "#111827",
  color: "#fff",
  minHeight: "100vh",
  padding: "20px",
  overflowY: "auto",

  position: isMobile
    ? "fixed"
    : "relative",

  left:
    isMobile &&
    !sidebarOpen
      ? "-300px"
      : "0",

  top: 0,

  zIndex: 1000,

  transition:
    "all 0.3s ease"
}}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#60A5FA"
        }}
      >
        School ERP
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >

        {/* DISTRICT ADMIN */}

       {role === "district_admin" && (
  <>
    <LinkStyle to="/dashboard">
      Dashboard
    </LinkStyle>

    {/* School Management */}
    <LinkStyle to="/schools">
      Add School
    </LinkStyle>

    <LinkStyle to="/school-list">
      School List
    </LinkStyle>

    {/* User Management */}
    <LinkStyle to="/users">
      Add User
    </LinkStyle>

    <LinkStyle to="/user-list">
      User List
    </LinkStyle>

    {/* Teacher Management */}
    <LinkStyle to="/teachers">
      Add Teacher
    </LinkStyle>

    <LinkStyle to="/teacher-list">
      Teacher List
    </LinkStyle>

    {/* Student Management */}
    <LinkStyle to="/students">
      Add Student
    </LinkStyle>

    <LinkStyle to="/student-list">
      Student List
    </LinkStyle>

    {/* Parent Management */}  
    <LinkStyle to="/parent-list">
      Parent List
    </LinkStyle>

    {/* Attendance */}
    <LinkStyle to="/attendance">
      Attendance
    </LinkStyle>

    <LinkStyle to="/attendance-list">
      Attendance List
    </LinkStyle>

    {/* Fees */}
    <LinkStyle to="/fees">
      Add Fee
    </LinkStyle>

    <LinkStyle to="/fee-list">
      Fee List
    </LinkStyle>

    {/* Exams */}
    <LinkStyle to="/exams">
      Create Exam
    </LinkStyle>

    <LinkStyle to="/exam-list">
      Exam List
    </LinkStyle>

    {/* Timetable */}
    <LinkStyle to="/timetable">
      Create Timetable
    </LinkStyle>

    <LinkStyle to="/timetable-list">
      Timetable List
    </LinkStyle>

    {/* Events */}
    <LinkStyle to="/events">
      Add Event
    </LinkStyle>

    <LinkStyle to="/event-list">
      Event List
    </LinkStyle>

    {/* Notifications */}
    <LinkStyle to="/notifications">
      Send Notification
    </LinkStyle>

    <LinkStyle to="/notification-list">
      Notification List
    </LinkStyle>

    {/* Messages */}
    <LinkStyle to="/messages">
      Send Message
    </LinkStyle>

    <LinkStyle to="/message-list">
      Message List
    </LinkStyle>

    {/* Leaves */}
    <LinkStyle to="/leaves">
      Leave Requests
    </LinkStyle>

    <LinkStyle to="/leave-list">
      Leave List
    </LinkStyle>

    {/* Payroll */}
    <LinkStyle to="/payroll">
      Generate Payroll
    </LinkStyle>

    <LinkStyle to="/payroll-list">
      Payroll List
    </LinkStyle>

    {/* Transport */}
    <LinkStyle to="/transport">
      Add Transport
    </LinkStyle>

    <LinkStyle to="/transport-list">
      Transport List
    </LinkStyle>

    {/* Hostel */}
    <LinkStyle to="/hostel">
      Add Hostel
    </LinkStyle>

    <LinkStyle to="/hostel-list">
      Hostel List
    </LinkStyle>

    {/* Reports */}
    <LinkStyle to="/reports">
      Reports
    </LinkStyle>

    {/* Audit */}
    <LinkStyle to="/audit-log">
      Audit Log
    </LinkStyle>

    <LinkStyle to="/audit-list">
      Audit List
    </LinkStyle>

    {/* Settings */}
    <LinkStyle to="/settings">
      Settings
    </LinkStyle>

    {/* Profile */}
    <LinkStyle to="/profile">
      My Profile
    </LinkStyle>
  </>
)}
        


        {/* TEACHER */}

{role === "teacher" && (
  <>
    <LinkStyle to="/dashboard">Dashboard</LinkStyle>

    <LinkStyle to="/student-list">Students</LinkStyle>

    <LinkStyle to="/attendance">Mark Attendance</LinkStyle>
    <LinkStyle to="/attendance-list">Attendance List</LinkStyle>

    <LinkStyle to="/exam-list">Exams</LinkStyle>

    <LinkStyle to="/timetable-list">Timetable</LinkStyle>

    <LinkStyle to="/event-list">Events</LinkStyle>

    <LinkStyle to="/messages">Send Message</LinkStyle>
    <LinkStyle to="/message-list">Message List</LinkStyle>

    <LinkStyle to="/notification-list">Notifications</LinkStyle>

    <LinkStyle to="/leaves">Apply Leave</LinkStyle>
    <LinkStyle to="/leave-list">Leave List</LinkStyle>

    <LinkStyle to="/payroll-list">Payroll</LinkStyle>

    <LinkStyle to="/profile">My Profile</LinkStyle>
  </>
)}

        {/* PARENT */}

{role === "parent" && (
  <>
    <LinkStyle to="/dashboard">Dashboard</LinkStyle>

    <LinkStyle to="/attendance-list">Attendance</LinkStyle>

    <LinkStyle to="/exam-list">Exam Results</LinkStyle>

    <LinkStyle to="/fee-list">Fees</LinkStyle>

    <LinkStyle to="/event-list">Events</LinkStyle>

    <LinkStyle to="/message-list">Messages</LinkStyle>

    <LinkStyle to="/notification-list">Notifications</LinkStyle>

    <LinkStyle to="/transport-list">Transport</LinkStyle>

    <LinkStyle to="/profile">My Profile</LinkStyle>
  </>
)}

       {/* STUDENT */}

{role === "student" && (
  <>
    <LinkStyle to="/dashboard">Dashboard</LinkStyle>

    <LinkStyle to="/attendance-list">Attendance</LinkStyle>

    <LinkStyle to="/exam-list">Exam Results</LinkStyle>

    <LinkStyle to="/timetable-list">Timetable</LinkStyle>

    <LinkStyle to="/event-list">Events</LinkStyle>

    <LinkStyle to="/message-list">Messages</LinkStyle>

    <LinkStyle to="/notification-list">Notifications</LinkStyle>

    <LinkStyle to="/hostel-list">Hostel</LinkStyle>

    <LinkStyle to="/transport-list">Transport</LinkStyle>

    <LinkStyle to="/leaves">Apply Leave</LinkStyle>
    <LinkStyle to="/leave-list">Leave List</LinkStyle>

    <LinkStyle to="/profile">My Profile</LinkStyle>
  </>
)}

      </div>

    </div>
  );
}

function LinkStyle({
  to,
  children
}) {

  const [hover, setHover] =
    useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() =>
        setHover(true)
      }
      onMouseLeave={() =>
        setHover(false)
      }
      style={{
        textDecoration: "none",
        color: hover
          ? "#fff"
          : "#E5E7EB",
        padding: "12px 15px",
        borderRadius: "10px",
        background: hover
          ? "linear-gradient(90deg,#2563EB,#3B82F6)"
          : "#1F2937",
        transform: hover
          ? "translateX(8px)"
          : "translateX(0px)",
        boxShadow: hover
          ? "0 4px 15px rgba(37,99,235,0.4)"
          : "none",
        transition:
          "all 0.3s ease",
        fontWeight: hover
          ? "600"
          : "500"
      }}
    >
      {children}
    </Link>
  );
}

export default Sidebar;