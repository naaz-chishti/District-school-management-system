import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";
import DataTable from "../../components/DataTable";

function TimetableList() {

  const navigate =
    useNavigate();

  const [
    timetable,
    setTimetable
  ] = useState([]);

  const [
    filteredTimetable,
    setFilteredTimetable
  ] = useState([]);

  const getTimetable =
    async () => {

      try {

        const res =
          await API.get(
            "/timetable/all"
          );

        const data =
          res.data.timetable || [];

        setTimetable(data);
        setFilteredTimetable(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getTimetable();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        timetable.filter(
          (item) =>
            item.className
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.section
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.subject
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            item.day
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredTimetable(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Timetable?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/timetable/delete/${id}`
        );

        alert(
          "Timetable Deleted Successfully"
        );

        getTimetable();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "className",
      label: "Class"
    },
    {
      key: "section",
      label: "Section"
    },
    {
      key: "day",
      label: "Day"
    },
    {
      key: "subject",
      label: "Subject"
    },
    {
      key: "teacher",
      label: "Teacher",
      render: (item) =>
        item.teacherId?.name ||
        "N/A"
    },
    {
      key: "time",
      label: "Time",
      render: (item) =>
        `${item.startTime} - ${item.endTime}`
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Timetable"
        count={
          filteredTimetable.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/timetable"
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
            "10px 15px",
          borderRadius:
            "8px",
          cursor:
            "pointer",
          marginBottom:
            "20px"
        }}
      >
        + Add Timetable
      </button>

      <DataTable
        columns={columns}
        data={
          filteredTimetable
        }
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/timetable?id=${item._id}`
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

export default TimetableList;

