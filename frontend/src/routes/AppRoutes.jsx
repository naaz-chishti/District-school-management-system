import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import Schools from "../pages/school/Schools";
import SchoolList from "../pages/school/SchoolList";

import Teachers from "../pages/teacher/Teachers";
import TeacherList from "../pages/teacher/TeacherList";

import Students from "../pages/student/Students";
import StudentList from "../pages/student/StudentList";
import StudentView from "../pages/student/StudentView";

import Parents from "../pages/parent/Parents";
import ParentList from "../pages/parent/ParentList";

import Fees from "../pages/fees/Fees";
import FeeList from "../pages/fees/FeeList";

import Attendance from "../pages/attendance/Attendance";
import AttendanceList from "../pages/attendance/AttendanceList";

import Exams from "../pages/exam/Exams";
import ExamList from "../pages/exam/ExamList";

import Timetable from "../pages/timetable/Timetable";
import TimetableList from "../pages/timetable/TimetableList";

import Hostel from "../pages/hostel/Hostel";
import HostelList from "../pages/hostel/HostelList";

import Payroll from "../pages/payroll/Payroll";
import PayrollList from "../pages/payroll/PayrollList";

import Transport from "../pages/transport/Transport";
import TransportList from "../pages/transport/TransportList";

import Reports from "../pages/reports/Reports";

import Events from "../pages/events/Events";
import EventList from "../pages/events/EventList";

import Leaves from "../pages/leaves/Leaves";
import LeaveList from "../pages/leaves/LeaveList";

import AuditLog from "../pages/audit/AuditLog";
import AuditLogList from "../pages/audit/AuditLogList";

import Messages from "../pages/messages/Messages";
import MessageList from "../pages/messages/MessageList";

import Notifications from "../pages/notifications/Notifications";
import NotificationList from "../pages/notifications/NotificationList";

import Users from "../pages/users/Users";
import UserList from "../pages/users/UserList";

import Settings from "../pages/settings/Settings";
import SettingList from "../pages/settings/SettingList";

import Profile from "../pages/profile/Profile";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* SCHOOLS */}
       <Route
  path="/schools"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin"
      ]}
    >
      <Schools />
    </ProtectedRoute>
  }
/>

       <Route
  path="/school-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin"
      ]}
    >
      <SchoolList />
    </ProtectedRoute>
  }
/>

        {/* TEACHERS */}
       <Route
  path="/teachers"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Teachers />
    </ProtectedRoute>
  }
/>

<Route
  path="/teacher-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <TeacherList />
    </ProtectedRoute>
  }
/>

        {/* STUDENTS */}
       <Route
  path="/students"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Students />
    </ProtectedRoute>
  }
/>

<Route
  path="/student-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <StudentList />
    </ProtectedRoute>
  }
/>
        <Route
  path="/student-view/:id"
  element={
    <ProtectedRoute>
      <StudentView />
    </ProtectedRoute>
  }
/>

        {/* PARENTS */}
        <Route
  path="/parents"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Parents />
    </ProtectedRoute>
  }
/>

<Route
  path="/parent-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <ParentList />
    </ProtectedRoute>
  }
/>

        {/* FEES */}
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fee-list"
          element={
            <ProtectedRoute>
              <FeeList />
            </ProtectedRoute>
          }
        />

       {/* ATTENDANCE */}
<Route
  path="/attendance"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <Attendance />
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ]}
    >
      <AttendanceList />
    </ProtectedRoute>
  }
/>

{/* EXAMS */}
<Route
  path="/exams"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <Exams />
    </ProtectedRoute>
  }
/>

<Route
  path="/exam-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ]}
    >
      <ExamList />
    </ProtectedRoute>
  }
/>

{/* TIMETABLE */}
<Route
  path="/timetable"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <Timetable />
    </ProtectedRoute>
  }
/>

<Route
  path="/timetable-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student"
      ]}
    >
      <TimetableList />
    </ProtectedRoute>
  }
/>

{/* HOSTEL */}
<Route
  path="/hostel"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Hostel />
    </ProtectedRoute>
  }
/>

<Route
  path="/hostel-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "student",
        "parent"
      ]}
    >
      <HostelList />
    </ProtectedRoute>
  }
/>

{/* PAYROLL */}
<Route
  path="/payroll"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Payroll />
    </ProtectedRoute>
  }
/>

<Route
  path="/payroll-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <PayrollList />
    </ProtectedRoute>
  }
/>

{/* TRANSPORT */}
<Route
  path="/transport"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Transport />
    </ProtectedRoute>
  }
/>

<Route
  path="/transport-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "student",
        "parent"
      ]}
    >
      <TransportList />
    </ProtectedRoute>
  }
/>

{/* REPORTS */}
<Route
  path="/reports"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <Reports />
    </ProtectedRoute>
  }
/>

        {/* EVENTS */}
        <Route
  path="/events"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher"
      ]}
    >
      <Events />
    </ProtectedRoute>
  }
/>

<Route
  path="/event-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student"
      ]}
    >
      <EventList />
    </ProtectedRoute>
  }
/>

       {/* LEAVES */}
<Route
  path="/leaves"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student"
      ]}
    >
      <Leaves />
    </ProtectedRoute>
  }
/>

<Route
  path="/leave-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student"
      ]}
    >
      <LeaveList />
    </ProtectedRoute>
  }
/>

        {/* AUDIT */}
        <Route
  path="/audit-log"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin"
      ]}
    >
      <AuditLog />
    </ProtectedRoute>
  }
/>

        {/* AUDIT */}
<Route
  path="/audit-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin"
      ]}
    >
      <AuditLogList />
    </ProtectedRoute>
  }
/>

       {/* MESSAGES */}
<Route
  path="/messages"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ]}
    >
      <Messages />
    </ProtectedRoute>
  }
/>

<Route
  path="/message-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ]}
    >
      <MessageList />
    </ProtectedRoute>
  }
/>


       {/* NOTIFICATIONS */}
<Route
  path="/notifications"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/notification-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ]}
    >
      <NotificationList />
    </ProtectedRoute>
  }
/>


        {/* USERS */}
       <Route
  path="/users"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin"
      ]}
    >
      <Users />
    </ProtectedRoute>
  }
/>

       <Route
  path="/user-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin"
      ]}
    >
      <UserList />
    </ProtectedRoute>
  }
/>
{/* SETTINGS */}
<Route
  path="/settings"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <Settings />
    </ProtectedRoute>
  }
/>

<Route
  path="/setting-list"
  element={
    <ProtectedRoute
      allowedRoles={[
        "district_admin",
        "school_admin"
      ]}
    >
      <SettingList />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;