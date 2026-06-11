import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import UserMenu from "./UserMenu";
import { FaBell, FaBars } from "react-icons/fa";

function TopNavbar({
  isMobile,
  setSidebarOpen
}) {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications,
    setShowNotifications] =
    useState(false);


  const getNotifications =
    async () => {
      try {
        const res =
          await API.get(
            "/notifications/latest"
          );

        setNotifications(
          res.data.notifications || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
  getNotifications();
}, []);

  return (
    <div
      style={{
        background: "#fff",
        padding: "15px 25px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
      borderBottom: "1px solid #eee",
        marginBottom: "20px"
      }}
    >
      <div>
        {isMobile && (
  <FaBars
    size={22}
    style={{
      cursor: "pointer",
      marginBottom: "10px"
    }}
    onClick={() =>
      setSidebarOpen(true)
    }
  />
)}
       <h2
  style={{
    color: "#2563eb",
    margin: 0,
    fontSize:
      window.innerWidth < 768
        ? "18px"
        : "26px"
  }}
>
          District School
          Management System
        </h2>
<small
  style={{
    display:
      window.innerWidth < 768
        ? "none"
        : "block"
  }}
>
  Empowering Education
  Through Technology 🎓 📚
</small>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          position: "relative"
        }}
      >

        {/* Bell */}
        <div
          style={{
            position: "relative",
            cursor: "pointer"
          }}
        >
          <FaBell
            style={{
              fontSize: "22px",
              cursor: "pointer",
              transition:
                "all 0.3s ease"
            }}
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "rotate(15deg) scale(1.15)";
              e.currentTarget.style.color =
                "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotate(0deg) scale(1)";
              e.currentTarget.style.color =
                "inherit";
            }}
          />

          <span
            style={{
              position:
                "absolute",
              top: "-8px",
              right: "-8px",
              background:
                "#ef4444",
              color: "#fff",
              borderRadius:
                "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center"
            }}
          >
            {notifications.length}
          </span>

          {showNotifications && (
            <div
              onMouseLeave={() =>
                setShowNotifications(
                  false
                )
              }
              style={{
                position:
                  "absolute",
                top: "40px",
                right: "0",
                width: "320px",
                background:
                  "#fff",
                borderRadius:
                  "12px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.15)",
                zIndex: 999,
                overflow:
                  "hidden"
              }}
            >
              <div
                style={{
                  padding:
                    "15px",
                  fontWeight:
                    "bold",
                  borderBottom:
                    "1px solid #eee",
                  background:
                    "#f8fafc"
                }}
              >
                Notifications
              </div>

              {notifications.length >
              0 ? (
                notifications.map(
                  (item) => (
                    <div
                      key={
                        item._id
                      }
                      style={{
                        padding:
                          "12px 15px",
                        borderBottom:
                          "1px solid #f1f1f1",
                        cursor:
                          "pointer",
                        transition:
                          "all 0.3s ease"
                      }}
                      onMouseEnter={(
                        e
                      ) => {
                        e.currentTarget.style.background =
                          "#EFF6FF";
                        e.currentTarget.style.paddingLeft =
                          "20px";
                      }}
                      onMouseLeave={(
                        e
                      ) => {
                        e.currentTarget.style.background =
                          "#fff";
                        e.currentTarget.style.paddingLeft =
                          "15px";
                      }}
                    >
                      <strong>
                        {
                          item.title
                        }
                      </strong>

                      <p
                        style={{
                          margin:
                            "5px 0",
                          fontSize:
                            "13px",
                          color:
                            "#6b7280"
                        }}
                      >
                        {
                          item.message
                        }
                      </p>
                    </div>
                  )
                )
              ) : (
                <div
                  style={{
                    padding:
                      "15px"
                  }}
                >
                  No Notifications
                </div>
              )}

              <div
                style={{
                  padding:
                    "12px",
                  textAlign:
                    "center",
                  color:
                    "#2563eb",
                  cursor:
                    "pointer",
                  fontWeight:
                    "bold",
                  background:
                    "#fafafa"
                }}
                onClick={() =>
                  navigate(
                    "/notification-list"
                  )
                }
              >
                View All
                Notifications
              </div>
            </div>
          )}
        </div>

        <UserMenu />
      </div>
    </div>
  );
}

export default TopNavbar;