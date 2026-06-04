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
      key: "message",
      label: "Message"
    },
    {
      key: "sentTo",
      label: "Sent To"
    },
    {
      key: "school",
      label: "School",
      render: (item) =>
        item.schoolId
          ?.schoolName || "N/A"
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

export default NotificationList;