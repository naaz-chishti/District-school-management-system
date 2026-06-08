import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";
import { toast } from "react-toastify";

function EventList() {

  const navigate = useNavigate();

  const [events, setEvents] =
    useState([]);

  const [
    filteredEvents,
    setFilteredEvents
  ] = useState([]);

  const getEvents =
    async () => {

      try {

        const res =
          await API.get(
            "/events/all"
          );

        const data =
          res.data.events || [];

        setEvents(data);
        setFilteredEvents(data);

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to load events"
        );

        console.log(error);
      }
    };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        events.filter(
          (event) =>
            event.title
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            event.eventType
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            event.description
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredEvents(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Event?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/events/delete/${id}`
        );

        toast.success(
          "Event Deleted Successfully"
        );

        getEvents();

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Delete Failed"
        );

        console.log(error);
      }
    };

  const columns = [
    {
      key: "title",
      label: "Event Title"
    },

    {
      key: "eventType",
      label: "Event Type"
    },

    {
      key: "startDate",
      label: "Start Date",
      render: (event) =>
        event.startDate
          ? new Date(
              event.startDate
            ).toLocaleDateString(
              "en-IN"
            )
          : "-"
    },

    {
      key: "endDate",
      label: "End Date",
      render: (event) =>
        event.endDate
          ? new Date(
              event.endDate
            ).toLocaleDateString(
              "en-IN"
            )
          : "-"
    },

    {
      key: "status",
      label: "Status",
      render: (event) => (
        <span
          style={{
            background:
              event.status ===
              "upcoming"
                ? "#dbeafe"
                : event.status ===
                  "completed"
                ? "#dcfce7"
                : "#fee2e2",

            color:
              event.status ===
              "upcoming"
                ? "#1d4ed8"
                : event.status ===
                  "completed"
                ? "#166534"
                : "#dc2626",

            padding:
              "5px 10px",

            borderRadius:
              "20px",

            fontWeight:
              "bold",

            textTransform:
              "capitalize"
          }}
        >
          {event.status}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Events"
        count={
          filteredEvents.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate("/events")
        }
        style={{
          background:
            "#2563eb",
          color:
            "#fff",
          border:
            "none",
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
        + Add Event
      </button>

      <DataTable
        columns={columns}
        data={filteredEvents}
        renderActions={(event) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/events?id=${event._id}`
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
                handleDelete(
                  event._id
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

export default EventList;