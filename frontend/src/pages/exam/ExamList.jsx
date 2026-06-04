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

function ExamList() {

  const navigate =
    useNavigate();

  const [
    exams,
    setExams
  ] = useState([]);

  const [
    filteredExams,
    setFilteredExams
  ] = useState([]);

  const getExams =
    async () => {

      try {

        const res =
          await API.get(
            "/exams/all"
          );

        const data =
          res.data.exams || [];

        setExams(data);
        setFilteredExams(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getExams();
  }, []);

  const handleSearch =
    (value) => {

      const filtered =
        exams.filter(
          (exam) =>
            exam.studentId?.name
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            exam.subject
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              ) ||

            exam.examType
              ?.toLowerCase()
              .includes(
                value.toLowerCase()
              )
        );

      setFilteredExams(
        filtered
      );
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Exam?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/exams/delete/${id}`
        );

        alert(
          "Exam Deleted Successfully"
        );

        getExams();

      } catch (error) {

        console.log(error);
      }
    };

  const columns = [
    {
      key: "student",
      label: "Student",
      render: (exam) =>
        exam.studentId?.name || "N/A"
    },
    {
      key: "subject",
      label: "Subject"
    },
    {
      key: "examType",
      label: "Exam"
    },
    {
      key: "totalMarks",
      label: "Total Marks"
    },
    {
      key: "obtainedMarks",
      label: "Obtained"
    },
    {
      key: "grade",
      label: "Grade",
      render: (exam) => (
        <span
          style={{
            background:
              "#dbeafe",
            color:
              "#1e40af",
            padding:
              "5px 10px",
            borderRadius:
              "20px",
            fontWeight:
              "bold"
          }}
        >
          {exam.grade}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>

      <TableHeader
        title="Exams"
        count={
          filteredExams.length
        }
        onSearch={
          handleSearch
        }
      />

      <button
        onClick={() =>
          navigate("/exams")
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
        + Add Exam
      </button>

      <DataTable
        columns={columns}
        data={
          filteredExams
        }
        renderActions={(exam) => (
          <>
            <button
              onClick={() =>
                navigate(
                  `/exams?id=${exam._id}`
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
                  exam._id
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

export default ExamList;

