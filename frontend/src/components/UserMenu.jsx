import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function UserMenu() {

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout = () => {

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
        position: "relative"
      }}
    >
     <FaUserCircle
  size={40}
  color="#38bdf8"
  style={{
    cursor: "pointer"
  }}
  onClick={() =>
    setOpen(!open)
  }
/>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "45px",
            width: "220px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 999
          }}
        >
          <div
            style={{
              padding: "15px",
              borderBottom:
                "1px solid #eee"
            }}
          >
            <strong>
              {user?.name}
            </strong>

            <p
              style={{
                margin: 0,
                fontSize: "12px"
              }}
            >
              {user?.role}
            </p>
          </div>

          <div
            style={{
              padding: "12px",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/profile")
            }
          >
            My Profile
          </div>

          <div
            style={{
              padding: "12px",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/settings")
            }
          >
            Settings
          </div>

          <div
            style={{
              padding: "12px",
              color: "red",
              cursor: "pointer"
            }}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;