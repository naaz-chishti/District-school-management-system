import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import UserMenu from "./UserMenu";

function TopNavbar() {

  const navigate = useNavigate();

  const [
    notifications,
    setNotifications
  ] = useState([]);

  const [
    showNotifications,
    setShowNotifications
  ] = useState(false);

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
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        marginBottom: "20px"
      }}
    >
      <div>

        <h2
          style={{
            color: "#2563eb",
            margin: 0
          }}
        >
         District School Management System
        </h2>

        <small>
          Empowering Education Through Technology 🎓 📚
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

        {/* Notification Bell */}

        <div
          style={{
            position: "relative",
            cursor: "pointer"
          }}
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
        >

          <FaBell
            size={22}
            color="#555"
          />

          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "red",
              color: "#fff",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {notifications.length}
          </span>

        </div>

        {/* Notification Dropdown */}

        {showNotifications && (

          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "60px",
              width: "320px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.15)",
              zIndex: 999
            }}
          >

            <div
              style={{
                padding: "15px",
                borderBottom:
                  "1px solid #eee",
                fontWeight: "bold"
              }}
            >
              Notifications
            </div>

            {notifications.length > 0 ? (

              notifications.map(
                (item) => (

                  <div
                    key={item._id}
                    style={{
                      padding: "12px 15px",
                      borderBottom:
                        "1px solid #f1f1f1"
                    }}
                  >

                    <strong>
                      {item.title}
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
                      {item.message}
                    </p>

                  </div>

                )
              )

            ) : (

              <div
                style={{
                  padding: "15px"
                }}
              >
                No Notifications
              </div>

            )}

            <div
              style={{
                padding: "12px",
                textAlign:
                  "center",
                color:
                  "#2563eb",
                cursor:
                  "pointer",
                fontWeight:
                  "bold"
              }}
              onClick={() =>
                navigate(
                  "/notification-list"
                )
              }
            >
              View All Notifications
            </div>

          </div>

        )}

        <UserMenu />

      </div>

    </div>
  );
}

export default TopNavbar;