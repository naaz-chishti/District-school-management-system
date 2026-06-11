import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function UserMenu() {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const user = JSON.parse(
  localStorage.getItem("user") ||
  sessionStorage.getItem("user")
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
    cursor: "pointer",
    transition: "all 0.3s ease"
  }}
  onClick={() =>
    setOpen(true)
  }
/>

      {open && (
  <div
    onMouseLeave={() =>
      setOpen(false)
    }
    style={{
      position: "absolute",
      right: 0,
      top: "50px",
      width: "220px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.15)",
      overflow: "hidden",
      zIndex: 999
    }}
  >
          <div
            style={{
              padding: "15px",
              borderBottom:
                "1px solid #eee",
              background:
                "#f8fafc"
            }}
          >
            <strong>
              {user?.name}
            </strong>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color:
                  "#6b7280"
              }}
            >
              {user?.role}
            </p>
          </div>

          <div
            style={{
              padding: "12px 15px",
              cursor: "pointer",
              transition:
                "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#EFF6FF";
              e.currentTarget.style.paddingLeft =
                "20px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#fff";
              e.currentTarget.style.paddingLeft =
                "15px";
            }}
           onClick={() => {
  setOpen(false);
  navigate("/profile");
}}
          >
            My Profile
          </div>

          <div
            style={{
              padding: "12px 15px",
              cursor: "pointer",
              transition:
                "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#EFF6FF";
              e.currentTarget.style.paddingLeft =
                "20px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#fff";
              e.currentTarget.style.paddingLeft =
                "15px";
            }}
           onClick={() => {
  setOpen(false);
  navigate("/settings");
}}
          >
            Settings
          </div>

          <div
            style={{
              padding: "12px 15px",
              color: "red",
              cursor: "pointer",
              transition:
                "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#FEF2F2";
              e.currentTarget.style.paddingLeft =
                "20px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#fff";
              e.currentTarget.style.paddingLeft =
                "15px";
            }}
           onClick={() => {
  setOpen(false);
  handleLogout();
}}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;