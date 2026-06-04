import { Link } from "react-router-dom";

function Sidebar() {

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
        overflowY: "auto"
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

            <LinkStyle to="/schools">
              Add School
            </LinkStyle>

            <LinkStyle to="/school-list">
              School List
            </LinkStyle>

            <LinkStyle to="/users">
              Add User
            </LinkStyle>

            <LinkStyle to="/user-list">
              User List
            </LinkStyle>

            <LinkStyle to="/teachers">
              Add Teacher
            </LinkStyle>

            <LinkStyle to="/teacher-list">
              Teacher List
            </LinkStyle>

            <LinkStyle to="/students">
              Add Student
            </LinkStyle>

            <LinkStyle to="/student-list">
              Student List
            </LinkStyle>

            <LinkStyle to="/parents">
              Add Parent
            </LinkStyle>

            <LinkStyle to="/parent-list">
              Parent List
            </LinkStyle>

            <LinkStyle to="/fees">
              Fees
            </LinkStyle>

            <LinkStyle to="/fee-list">
              Fee List
            </LinkStyle>

            <LinkStyle to="/audit-log">
              Audit Log
            </LinkStyle>

            <LinkStyle to="/audit-list">
              Audit List
            </LinkStyle>

            <LinkStyle to="/settings">
              Settings
            </LinkStyle>

            <LinkStyle to="/profile">
              My Profile
            </LinkStyle>
          </>
        )}

        <LinkStyle to="/exam-list">Exam List</LinkStyle>
<LinkStyle to="/timetable-list">Timetable List</LinkStyle>
<LinkStyle to="/event-list">Event List</LinkStyle>
<LinkStyle to="/leave-list">Leave List</LinkStyle>
<LinkStyle to="/message-list">Message List</LinkStyle>
<LinkStyle to="/notification-list">Notification List</LinkStyle>
<LinkStyle to="/reports">Reports</LinkStyle>
<LinkStyle to="/transport-list">Transport List</LinkStyle>
<LinkStyle to="/hostel-list">Hostel List</LinkStyle>
<LinkStyle to="/payroll-list">Payroll List</LinkStyle>

        {/* TEACHER */}

{role === "teacher" && (
  <>
    <LinkStyle to="/dashboard">
      Dashboard
    </LinkStyle>

    <LinkStyle to="/student-list">
      Students
    </LinkStyle>

    <LinkStyle to="/attendance">
      Attendance
    </LinkStyle>

    <LinkStyle to="/attendance-list">
      Attendance List
    </LinkStyle>

    <LinkStyle to="/exam-list">
      Exams
    </LinkStyle>

    <LinkStyle to="/timetable-list">
      Timetable
    </LinkStyle>

    <LinkStyle to="/events">
      Events
    </LinkStyle>

    <LinkStyle to="/event-list">
      Event List
    </LinkStyle>

    <LinkStyle to="/leaves">
      Leaves
    </LinkStyle>

    <LinkStyle to="/leave-list">
      Leave List
    </LinkStyle>

    <LinkStyle to="/messages">
      Messages
    </LinkStyle>

    <LinkStyle to="/message-list">
      Message List
    </LinkStyle>

    <LinkStyle to="/notification-list">
      Notifications
    </LinkStyle>

    <LinkStyle to="/payroll-list">
      Payroll
    </LinkStyle>

    <LinkStyle to="/profile">
      My Profile
    </LinkStyle>
  </>
)}

        {/* PARENT */}

{role === "parent" && (
  <>
    <LinkStyle to="/dashboard">
      Dashboard
    </LinkStyle>

    <LinkStyle to="/fee-list">
      Fees
    </LinkStyle>

    <LinkStyle to="/attendance-list">
      Attendance
    </LinkStyle>

    <LinkStyle to="/exam-list">
      Exams
    </LinkStyle>

    <LinkStyle to="/event-list">
      Events
    </LinkStyle>

    <LinkStyle to="/message-list">
      Messages
    </LinkStyle>

    <LinkStyle to="/notification-list">
      Notifications
    </LinkStyle>

    <LinkStyle to="/transport-list">
      Transport
    </LinkStyle>

    <LinkStyle to="/profile">
      My Profile
    </LinkStyle>
  </>
)}

       {/* STUDENT */}

{role === "student" && (
  <>
    <LinkStyle to="/dashboard">
      Dashboard
    </LinkStyle>

    <LinkStyle to="/attendance-list">
      Attendance
    </LinkStyle>

    <LinkStyle to="/exam-list">
      Exams
    </LinkStyle>

    <LinkStyle to="/timetable-list">
      Timetable
    </LinkStyle>

    <LinkStyle to="/event-list">
      Events
    </LinkStyle>

    <LinkStyle to="/message-list">
      Messages
    </LinkStyle>

    <LinkStyle to="/notification-list">
      Notifications
    </LinkStyle>

    <LinkStyle to="/hostel-list">
      Hostel
    </LinkStyle>

    <LinkStyle to="/transport-list">
      Transport
    </LinkStyle>

    <LinkStyle to="/leave-list">
      Leaves
    </LinkStyle>

    <LinkStyle to="/profile">
      My Profile
    </LinkStyle>
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
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#E5E7EB",
        padding: "10px 15px",
        borderRadius: "8px",
        background: "#1F2937"
      }}
    >
      {children}
    </Link>
  );
}

export default Sidebar;