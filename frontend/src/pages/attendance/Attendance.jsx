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

function Attendance() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const attendanceId =
    searchParams.get(
      "id"
    );

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
    status: "",
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

  // Get Single Attendance
  const getSingleAttendance =
    async () => {

      try {

        const res =
          await API.get(
            "/attendance/all"
          );

        const attendance =
          res.data.attendance.find(
            (a) =>
              a._id ===
              attendanceId
          );

        if (
          attendance
        ) {

          setEditId(
            attendance._id
          );

          setFormData({
            studentId:
              attendance
                .studentId
                ?._id || "",
            schoolId:
              attendance
                .schoolId
                ?._id || "",
            status:
              attendance.status ||
              "",
            remarks:
              attendance.remarks ||
              ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getStudents();
    getSchools();

    if (
      attendanceId
    ) {
      getSingleAttendance();
    }

  }, [attendanceId]);

  // Input Change
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          editId
        ) {

          await API.put(
            `/attendance/update/${editId}`,
            formData
          );

          alert(
            "Attendance Updated Successfully"
          );

          navigate(
            "/attendance-list"
          );

        } else {

          await API.post(
            "/attendance/mark",
            formData
          );

          alert(
            "Attendance Added Successfully"
          );
        }

        setFormData({
          studentId: "",
          schoolId: "",
          status: "",
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
      maxWidth: "1000px",
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
        📅 {editId
          ? "Edit Attendance"
          : "Mark Attendance"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Manage student attendance records
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

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Status
          </option>

          <option value="present">
            ✅ Present
          </option>

          <option value="absent">
            ❌ Absent
          </option>

          <option value="late">
            ⏰ Late
          </option>
        </select>

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
          ? "Update Attendance"
          : "Mark Attendance"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Attendance;