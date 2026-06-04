import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

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

            event.location
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            event.organizer
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

        alert(
          "Event Deleted Successfully"
        );

        getEvents();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "title",
      label: "Event"
    },
    {
      key: "location",
      label: "Location"
    },
    {
      key: "organizer",
      label: "Organizer"
    },
    {
      key: "date",
      label: "Date",
      render: (event) =>
        new Date(
          event.date
        ).toLocaleDateString()
    },
    {
      key: "status",
      label: "Status",
      render: (event) => (
        <span
          style={{
            background:
              event.status === "Upcoming"
                ? "#dbeafe"
                : "#dcfce7",
            color:
              event.status === "Upcoming"
                ? "#1d4ed8"
                : "#166534",
            padding:
              "5px 10px",
            borderRadius:
              "20px",
            fontWeight:
              "bold"
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

