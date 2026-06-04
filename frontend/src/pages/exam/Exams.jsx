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
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1>Exams</h1>

      <form
        onSubmit={handleSubmit}
      >

        <select
          name="studentId"
          value={
            formData.studentId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (
              <option
                key={
                  student._id
                }
                value={
                  student._id
                }
              >
                {student.name}
              </option>
            )
          )}
        </select>

        <br /><br />

        <select
          name="schoolId"
          value={
            formData.schoolId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select School
          </option>

          {schools.map(
            (school) => (
              <option
                key={
                  school._id
                }
                value={
                  school._id
                }
              >
                {
                  school.schoolName
                }
              </option>
            )
          )}
        </select>

        <br /><br />

        <input
          type="text"
          name="className"
          placeholder="Class"
          value={
            formData.className
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={
            formData.section
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={
            formData.subject
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <select
          name="examType"
          value={
            formData.examType
          }
          onChange={
            handleChange
          }
        >
          <option value="">
            Select Exam
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

        <br /><br />

        <input
          type="date"
          name="examDate"
          value={
            formData.examDate
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={
            formData.totalMarks
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="number"
          name="obtainedMarks"
          placeholder="Obtained Marks"
          value={
            formData.obtainedMarks
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={
            formData.remarks
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <button type="submit">
          {editId
            ? "Update Exam"
            : "Add Exam"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Exams;