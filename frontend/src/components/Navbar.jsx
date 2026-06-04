import { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // safer than "/"
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      {/* Left Side */}
      <div>
        <h2 style={{ color: "#2563eb", margin: 0 }}>
          School ERP Dashboard
        </h2>
        <small>Welcome Back 👋</small>
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <FaBell size={22} color="#555" />

        {/* User Section */}
        <div style={{ position: "relative" }} ref={menuRef}>
          <FaUserCircle
            size={32}
            color="#2563eb"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          />

          {/* Dropdown */}
          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "45px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "160px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
            >
              {user ? (
                <>
                  <p
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                  >
                    👤 Profile
                  </p>

                  <p
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => {
                      setOpen(false);
                      navigate("/dashboard");
                    }}
                  >
                    🏠 Dashboard
                  </p>

                  <p
                    style={{ padding: "10px", cursor: "pointer", color: "red" }}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </p>
                </>
              ) : (
                <p
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  🔐 Login
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;