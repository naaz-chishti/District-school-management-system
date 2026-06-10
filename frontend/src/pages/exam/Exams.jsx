import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Exams() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const examId =
    searchParams.get("id");

  const [
    students,
    setStudents
  ] = useState([]);

  const [
    schools,
    setSchools
  ] = useState([]);

  const [
    editId,
    setEditId
  ] = useState(null);

  const [
    formData,
    setFormData
  ] = useState({
    studentId: "",
    schoolId: "",
    className: "",
    section: "",
    subject: "",
    examType: "",
    examDate: "",
    totalMarks: "",
    obtainedMarks: "",
    remarks: ""
  });

  // Get Students
  const getStudents =
    async () => {
      try {

        const res =
          await API.get(
            "/students/all"
          );

        setStudents(
          res.data.students
        );

      } catch (error) {
        console.log(error);
      }
    };

  // Get Schools
  const getSchools =
    async () => {
      try {

        const res =
          await API.get(
            "/schools/all"
          );

        setSchools(
          res.data.schools
        );

      } catch (error) {
        console.log(error);
      }
    };

  // Get Single Exam
  const getSingleExam =
    async () => {

      try {

        const res =
          await API.get(
            "/exams/all"
          );

        const exam =
          res.data.exams.find(
            (e) =>
              e._id === examId
          );

        if (exam) {

          setEditId(
            exam._id
          );

          setFormData({
            studentId:
              exam.studentId?._id || "",
            schoolId:
              exam.schoolId?._id || "",
            className:
              exam.className || "",
            section:
              exam.section || "",
            subject:
              exam.subject || "",
            examType:
              exam.examType || "",
            examDate:
              exam.examDate
                ?.split("T")[0] || "",
            totalMarks:
              exam.totalMarks || "",
            obtainedMarks:
              exam.obtainedMarks || "",
            remarks:
              exam.remarks || ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getStudents();
    getSchools();

    if (examId) {
      getSingleExam();
    }

  }, [examId]);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (editId) {

          await API.put(
            `/exams/update/${editId}`,
            formData
          );

          alert(
            "Exam Updated Successfully"
          );

          navigate(
            "/exam-list"
          );

        } else {

          await API.post(
            "/exams/add",
            formData
          );

          alert(
            "Exam Added Successfully"
          );
        }

        setFormData({
          studentId: "",
          schoolId: "",
          className: "",
          section: "",
          subject: "",
          examType: "",
          examDate: "",
          totalMarks: "",
          obtainedMarks: "",
          remarks: ""
        });

      } catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

  console.log(error);
}
    };

    const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box"
};

  return (
   <DashboardLayout>

  <div
    style={{
      background: "#fff",
      padding: "35px",
      borderRadius: "20px",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.08)",
      maxWidth: "1100px",
      margin: "0 auto"
    }}
  >

    <div
      style={{
        marginBottom: "30px"
      }}
    >
      <h1
        style={{
          margin: 0,
          color: "#111827",
          fontSize: "32px"
        }}
      >
        📝 {editId
          ? "Edit Exam"
          : "Add Exam"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Manage student exam records and marks
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px"
        }}
      >

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            )
          )}
        </select>

        <select
          name="schoolId"
          value={formData.schoolId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select School
          </option>

          {schools.map(
            (school) => (
              <option
                key={school._id}
                value={school._id}
              >
                {school.schoolName}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          name="className"
          placeholder="Class"
          value={formData.className}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="examType"
          value={formData.examType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">
            Select Exam Type
          </option>

          <option value="unit_test">
            Unit Test
          </option>

          <option value="mid_term">
            Mid Term
          </option>

          <option value="final_exam">
            Final Exam
          </option>
        </select>

        <input
          type="date"
          name="examDate"
          value={formData.examDate}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={formData.totalMarks}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="obtainedMarks"
          placeholder="Obtained Marks"
          value={formData.obtainedMarks}
          onChange={handleChange}
          style={inputStyle}
        />

      </div>

      <textarea
        name="remarks"
        placeholder="Remarks"
        value={formData.remarks}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px 15px",
          border:
            "1px solid #D1D5DB",
          borderRadius: "10px",
          fontSize: "14px",
          marginTop: "20px",
          minHeight: "120px",
          resize: "none",
          boxSizing: "border-box"
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          marginTop: "25px",
          background:
            "linear-gradient(135deg,#2563EB,#3B82F6)",
          color: "#fff",
          border: "none",
          padding: "14px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow:
            "0 6px 15px rgba(37,99,235,0.3)"
        }}
      >
        {editId
          ? "Update Exam"
          : "Add Exam"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Exams;