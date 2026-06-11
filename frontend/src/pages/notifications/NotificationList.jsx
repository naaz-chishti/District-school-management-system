import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function NotificationList() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState([]);

  const [
    filteredNotifications,
    setFilteredNotifications
  ] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const response =
          await API.get(
            "/notifications/all"
          );

        const data =
          response.data
            .notifications || [];

        setNotifications(data);
        setFilteredNotifications(
          data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSearch =
    (value) => {
      const filtered =
        notifications.filter(
          (item) =>
            item.title
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            item.message
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            item.sentTo
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredNotifications(
        filtered
      );
    };

  const deleteNotification =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete Notification?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/notifications/delete/${id}`
        );

        alert(
          "Notification Deleted Successfully"
        );

        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
  {
    key: "title",
    label: "Title"
  },

  {
    key: "sentTo",
    label: "Audience",

    render: (item) =>
      item.sentTo
        ?.replace("_", " ")
        ?.toUpperCase()
  },

  {
    key: "priority",
    label: "Priority",

    render: (item) => (

      <span
        style={{
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "600",
          background:
            item.priority === "urgent"
              ? "#FEE2E2"
              : item.priority === "important"
              ? "#FEF3C7"
              : "#DCFCE7",

          color:
            item.priority === "urgent"
              ? "#DC2626"
              : item.priority === "important"
              ? "#D97706"
              : "#16A34A"
        }}
      >
        {item.priority || "normal"}
      </span>

    )
  },

  {
    key: "school",
    label: "School",

    render: (item) =>
      item.schoolId
        ?.schoolName || "-"
  },

  {
    key: "createdBy",
    label: "Created By",

    render: (item) =>
      item.createdBy
        ?.name || "-"
  },

  {
    key: "date",
    label: "Date",

    render: (item) =>
      new Date(
        item.createdAt
      ).toLocaleDateString()
  }
];

  return (
    <DashboardLayout>
      <TableHeader
        title="Notifications"
        count={
          filteredNotifications.length
        }
        onSearch={
          handleSearch
        }
      />

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "25px"
  }}
>

  <div style={statCard}>
    <h2>
      {notifications.length}
    </h2>
    <p>
      Total Notifications
    </p>
  </div>

  <div style={statCard}>
    <h2>
      {
        notifications.filter(
          n =>
            n.priority ===
            "urgent"
        ).length
      }
    </h2>
    <p>
      Urgent
    </p>
  </div>

  <div style={statCard}>
    <h2>
      {
        notifications.filter(
          n =>
            n.priority ===
            "important"
        ).length
      }
    </h2>
    <p>
      Important
    </p>
  </div>

  <div style={statCard}>
    <h2>
      {
        notifications.filter(
          n =>
            n.priority ===
            "normal"
        ).length
      }
    </h2>
    <p>
      Normal
    </p>
  </div>

</div>

      <button
        onClick={() =>
          navigate(
            "/notifications"
          )
        }
        style={{
          background:
            "#2563eb",
          color: "#fff",
          border: "none",
          padding:
            "10px 15px",
          borderRadius:
            "8px",
          cursor:
            "pointer",
          marginBottom:
            "20px"
        }}
      >
        + Add Notification
      </button>

      <DataTable
        columns={columns}
        data={
          filteredNotifications
        }
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/notifications?id=${item._id}`
                )
              }
              style={{
                background:
                  "#2563eb",
                color:
                  "#fff",
                border:
                  "none",
                padding:
                  "6px 12px",
                borderRadius:
                  "6px",
                marginRight:
                  "10px",
                cursor:
                  "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteNotification(
                  item._id
                )
              }
              style={{
                background:
                  "#dc2626",
                color:
                  "#fff",
                border:
                  "none",
                padding:
                  "6px 12px",
                borderRadius:
                  "6px",
                cursor:
                  "pointer"
              }}
            >
              Delete
            </button>
          </>
        )}
      />
    </DashboardLayout>
  );
}

const statCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.08)"
};

export default NotificationList;