import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import TableHeader from "../../components/TableHeader";

function TeacherList() {

  const navigate =
    useNavigate();

  const [
    teachers,
    setTeachers
  ] = useState([]);

  const [
    filteredTeachers,
    setFilteredTeachers
  ] = useState([]);

  const getTeachers =
    async () => {

      try {

        const res =
          await API.get(
            "/teachers/all"
          );

        const data =
          res.data.teachers || [];

        setTeachers(data);
        setFilteredTeachers(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getTeachers();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        teachers.filter(
          (teacher) =>
            teacher.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            teacher.email
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            teacher.subject
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredTeachers(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Teacher?"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await API.delete(
          `/teachers/delete/${id}`
        );

        alert(
          "Teacher Deleted Successfully"
        );

        getTeachers();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "teacherId",
      label: "Teacher ID"
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "subject",
      label: "Subject"
    },
    {
      key: "school",
      label: "School",
      render: (teacher) =>
        teacher.schoolId
          ?.schoolName || "N/A"
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Teachers"
        count={
          filteredTeachers.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate(
            "/teachers"
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
        + Add Teacher
      </button>

      <DataTable
        columns={columns}
        data={
          filteredTeachers
        }
        renderActions={(
          teacher
        ) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/teachers?id=${teacher._id}`
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
                  teacher._id
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

export default TeacherList;