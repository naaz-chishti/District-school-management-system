import {
  useNavigate
} from "react-router-dom";

import {
  Link
} from "react-router-dom";

function Sidebar() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const role =
    user?.role;

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/");
    };

  return (
    <div
      style={{
        width: "250px",
        background:
          "#222",
        color:
          "white",
        height:
          "100vh",
        padding:
          "20px"
      }}
    >
      <h2>
        School Admin
      </h2>

      <ul
        style={{
          listStyle:
            "none",
          padding: 0
        }}
      >

        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            style={{
              color:
                "white"
            }}
          >
            Dashboard
          </Link>
        </li>

        {/* Schools */}
        {role ===
          "district_admin" && (
          <li>
            <Link
              to="/schools"
              style={{
                color:
                  "white"
              }}
            >
              Schools
            </Link>
          </li>
        )}

        {/* Teachers */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/teachers"
              style={{
                color:
                  "white"
              }}
            >
              Teachers
            </Link>
          </li>
        )}

        {/* Students */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin" ||
          role ===
          "teacher") && (
          <li>
            <Link
              to="/students"
              style={{
                color:
                  "white"
              }}
            >
              Students
            </Link>
          </li>
        )}

        {/* Parents */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/parents"
              style={{
                color:
                  "white"
              }}
            >
              Parents
            </Link>
          </li>
        )}

        {/* Users */}
        {role ===
          "district_admin" && (
          <li>
            <Link
              to="/users"
              style={{
                color:
                  "white"
              }}
            >
              Users
            </Link>
          </li>
        )}

        {/* Attendance */}
        {(role ===
          "school_admin" ||
          role ===
          "teacher" ||
          role ===
          "student") && (
          <li>
            <Link
              to="/attendance"
              style={{
                color:
                  "white"
              }}
            >
              Attendance
            </Link>
          </li>
        )}

        {/* Timetable */}
        <li>
          <Link
            to="/timetable"
            style={{
              color:
                "white"
            }}
          >
            Timetable
          </Link>
        </li>

        {/* Fees */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin" ||
          role ===
          "parent") && (
          <li>
            <Link
              to="/fees"
              style={{
                color:
                  "white"
              }}
            >
              Fees
            </Link>
          </li>
        )}

        {/* Exams */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin" ||
          role ===
          "teacher" ||
          role ===
          "student" ||
          role ===
          "parent") && (
          <li>
            <Link
              to="/exams"
              style={{
                color:
                  "white"
              }}
            >
              Exams
            </Link>
          </li>
        )}

        {/* Hostel */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/hostel"
              style={{
                color:
                  "white"
              }}
            >
              Hostel
            </Link>
          </li>
        )}

        {/* Payroll */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/payroll"
              style={{
                color:
                  "white"
              }}
            >
              Payroll
            </Link>
          </li>
        )}

        {/* Transport */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/transport"
              style={{
                color:
                  "white"
              }}
            >
              Transport
            </Link>
          </li>
        )}

        {/* Reports */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/reports"
              style={{
                color:
                  "white"
              }}
            >
              Reports
            </Link>
          </li>
        )}

        {/* Events */}
        <li>
          <Link
            to="/events"
            style={{
              color:
                "white"
            }}
          >
            Events
          </Link>
        </li>

        {/* Leaves */}
        <li>
          <Link
            to="/leaves"
            style={{
              color:
                "white"
            }}
          >
            Leaves
          </Link>
        </li>

        {/* Audit */}
        {role ===
          "district_admin" && (
          <li>
            <Link
              to="/audit"
              style={{
                color:
                  "white"
              }}
            >
              Audit Log
            </Link>
          </li>
        )}

        {/* Messages */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin" ||
          role ===
          "teacher" ||
          role ===
          "parent") && (
          <li>
            <Link
              to="/messages"
              style={{
                color:
                  "white"
              }}
            >
              Messages
            </Link>
          </li>
        )}

        {/* Notifications */}
        <li>
          <Link
            to="/notifications"
            style={{
              color:
                "white"
            }}
          >
            Notifications
          </Link>
        </li>

        {/* Settings */}
        {(role ===
          "district_admin" ||
          role ===
          "school_admin") && (
          <li>
            <Link
              to="/settings"
              style={{
                color:
                  "white"
              }}
            >
              Settings
            </Link>
          </li>
        )}

      </ul>

      <button
        onClick={
          handleLogout
        }
        style={{
          width: "100%",
          padding:
            "10px",
          background:
            "red",
          color:
            "white",
          border:
            "none",
          cursor:
            "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;