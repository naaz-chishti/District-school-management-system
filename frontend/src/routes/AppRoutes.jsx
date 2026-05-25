import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Schools from "../pages/school/Schools";
import Teachers from "../pages/teacher/Teachers";
import Students from "../pages/student/Students";
import Parents from "../pages/parent/Parents";
import Attendance from "../pages/attendance/Attendance";
import Fees from "../pages/fees/Fees";
import Exams from "../pages/exam/Exams";
import Hostel from "../pages/hostel/Hostel";
import Transport from "../pages/transport/Transport";
import Timetable from "../pages/timetable/Timetable";
import Events from "../pages/events/Events";
import Leaves from "../pages/leaves/Leaves";
import Settings from "../pages/setting/Settings";
import AuditLog from "../pages/audit/AuditLog";
import Messages from "../pages/messages/Messages";
import Notifications from "../pages/notifications/Notifications";
import Payroll from "../pages/payroll/Payroll";
import Reports from "../pages/reports/Reports";
import Users from "../pages/users/Users";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Schools */}
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

        {/* Teachers */}
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

        {/* Students */}
        <Route
          path="/students"
          element={
            <ProtectedRoute
              allowedRoles={[
                "district_admin",
                "school_admin",
                "teacher"
              ]}
            >
              <Students />
            </ProtectedRoute>
          }
        />

        {/* Parents */}
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

        {/* Attendance */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              allowedRoles={[
                "school_admin",
                "teacher",
                "student"
              ]}
            >
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* Fees */}
        <Route
          path="/fees"
          element={
            <ProtectedRoute
              allowedRoles={[
                "district_admin",
                "school_admin",
                "parent"
              ]}
            >
              <Fees />
            </ProtectedRoute>
          }
        />

        {/* Exams */}
        <Route
          path="/exams"
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
              <Exams />
            </ProtectedRoute>
          }
        />

        {/* Hostel */}
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

        {/* Transport */}
        <Route
          path="/transport"
          element={
            <ProtectedRoute>
              <Transport />
            </ProtectedRoute>
          }
        />

        {/* Timetable */}
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />

        {/* Events */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        {/* Leaves */}
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Leaves />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
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

        {/* Audit */}
        <Route
          path="/audit"
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

        {/* Messages */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute
              allowedRoles={[
                "district_admin",
                "school_admin",
                "teacher",
                "parent"
              ]}
            >
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Payroll */}
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

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              allowedRoles={[
                "district_admin",
                "school_admin"
              ]}
            >
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Users */}
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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;