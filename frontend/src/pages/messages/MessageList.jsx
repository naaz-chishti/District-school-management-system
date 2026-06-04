import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function MessageList() {
  const navigate = useNavigate();

  const [messages, setMessages] =
    useState([]);

  const [
    filteredMessages,
    setFilteredMessages
  ] = useState([]);

  const fetchInbox =
    async () => {
      try {
        const response =
          await API.get(
            "/messages/inbox"
          );

        const data =
          response.data.inbox || [];

        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchInbox();
  }, []);

  const handleSearch =
    (value) => {
      const filtered =
        messages.filter(
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
            item.messageType
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            item.senderId?.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredMessages(
        filtered
      );
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete Message?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/messages/delete/${id}`
        );

        alert(
          "Deleted Successfully"
        );

        fetchInbox();
      } catch (error) {
        console.log(error);
      }
    };

  const columns = [
    {
      key: "sender",
      label: "Sender",
      render: (item) =>
        item.senderId?.name ||
        "N/A"
    },
    {
      key: "title",
      label: "Title"
    },
    {
      key: "message",
      label: "Message"
    },
    {
      key: "messageType",
      label: "Type"
    },
    {
      key: "createdAt",
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
        title="Messages"
        count={
          filteredMessages.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate("/messages")
        }
        style={{
          background:
            "#2563eb",
          color: "#fff",
          border: "none",
          padding:
            "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        + Send Message
      </button>

      <DataTable
        columns={columns}
        data={filteredMessages}
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/messages?id=${item._id}`
                )
              }
              style={{
                background:
                  "#2563eb",
                color: "#fff",
                border: "none",
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
                handleDelete(
                  item._id
                )
              }
              style={{
                background:
                  "#dc2626",
                color: "#fff",
                border: "none",
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

export default MessageList;