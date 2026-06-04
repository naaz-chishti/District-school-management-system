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

function AttendanceList() {

  const navigate =
    useNavigate();

  const [
    attendance,
    setAttendance
  ] = useState([]);

  const [
    filteredAttendance,
    setFilteredAttendance
  ] = useState([]);

  const getAttendance =
    async () => {

      try {

        const res =
          await API.get(
            "/attendance/all"
          );

        const data =
          res.data.attendance || [];

        setAttendance(data);
        setFilteredAttendance(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getAttendance();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        attendance.filter(
          (item) =>
            item.studentId?.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            item.schoolId?.schoolName
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||
            item.status
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredAttendance(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Attendance?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/attendance/delete/${id}`
        );

        alert(
          "Attendance Deleted Successfully"
        );

        getAttendance();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "student",
      label: "Student",
      render: (item) =>
        item.studentId?.name || "N/A"
    },
    {
      key: "school",
      label: "School",
      render: (item) =>
        item.schoolId?.schoolName || "N/A"
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          style={{
            background:
              item.status === "Present"
                ? "#dcfce7"
                : "#fee2e2",
            color:
              item.status === "Present"
                ? "#166534"
                : "#991b1b",
            padding:
              "5px 10px",
            borderRadius:
              "20px",
            fontSize:
              "12px",
            fontWeight:
              "bold"
          }}
        >
          {item.status}
        </span>
      )
    },
    {
      key: "date",
      label: "Date",
      render: (item) =>
        new Date(
          item.date
        ).toLocaleDateString()
    },
    {
      key: "remarks",
      label: "Remarks",
      render: (item) =>
        item.remarks || "-"
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Attendance"
        count={
          filteredAttendance.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/attendance"
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
        + Add Attendance
      </button>

      <DataTable
        columns={columns}
        data={
          filteredAttendance
        }
        renderActions={(item) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/attendance?id=${item._id}`
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

export default AttendanceList;