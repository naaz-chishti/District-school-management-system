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
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1>
        Attendance
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          background:
            "white",
          padding:
            "30px",
          borderRadius:
            "15px"
        }}
      >

        <h2>
          {editId
            ? "Edit Attendance"
            : "Add Attendance"}
        </h2>

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
            (
              student
            ) => (
              <option
                key={
                  student._id
                }
                value={
                  student._id
                }
              >
                {
                  student.name
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

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
            (
              school
            ) => (
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

        <br />
        <br />

        <select
          name="status"
          value={
            formData.status
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Status
          </option>

          <option value="present">
            Present
          </option>

          <option value="absent">
            Absent
          </option>

          <option value="late">
            Late
          </option>
        </select>

        <br />
        <br />

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

        <br />
        <br />

        <button
          type="submit"
        >
          {editId
            ? "Update Attendance"
            : "Add Attendance"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Attendance;