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

function Timetable() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const timetableId =
    searchParams.get(
      "id"
    );

  const [
    schools,
    setSchools
  ] = useState([]);

  const [
    teachers,
    setTeachers
  ] = useState([]);

  const [
    editId,
    setEditId
  ] = useState(null);

  const [
    formData,
    setFormData
  ] = useState({
    schoolId: "",
    className: "",
    section: "",
    day: "",
    subject: "",
    teacherId: "",
    startTime: "",
    endTime: ""
  });

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

  // Get Teachers
  const getTeachers =
    async () => {

      try {

        const res =
          await API.get(
            "/teachers/all"
          );

        setTeachers(
          res.data.teachers
        );

      } catch (error) {
        console.log(error);
      }
    };

  // Get Single Timetable
  const getSingleTimetable =
    async () => {

      try {

        const res =
          await API.get(
            "/timetable/all"
          );

        const timetable =
          res.data.timetable.find(
            (t) =>
              t._id ===
              timetableId
          );

        if (
          timetable
        ) {

          setEditId(
            timetable._id
          );

          setFormData({
            schoolId:
              timetable
                .schoolId
                ?._id || "",

            className:
              timetable.className || "",

            section:
              timetable.section || "",

            day:
              timetable.day || "",

            subject:
              timetable.subject || "",

            teacherId:
              timetable
                .teacherId
                ?._id || "",

            startTime:
              timetable.startTime || "",

            endTime:
              timetable.endTime || ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getSchools();
    getTeachers();

    if (
      timetableId
    ) {
      getSingleTimetable();
    }

  }, [timetableId]);

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

        // Update
        if (
          editId
        ) {

          await API.put(
            `/timetable/update/${editId}`,
            formData
          );

          alert(
            "Timetable Updated Successfully"
          );

          navigate(
            "/timetable-list"
          );
        }

        // Add
        else {

          await API.post(
            "/timetable/add",
            formData
          );

          alert(
            "Timetable Added Successfully"
          );
        }

        setFormData({
          schoolId: "",
          className: "",
          section: "",
          day: "",
          subject: "",
          teacherId: "",
          startTime: "",
          endTime: ""
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
        📚 {editId
          ? "Edit Timetable"
          : "Add Timetable"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Manage class schedules and teacher allocations
      </p>
    </div>

    <form onSubmit={handleSubmit}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px"
        }}
      >

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
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Day
          </option>

          <option value="Monday">
            Monday
          </option>

          <option value="Tuesday">
            Tuesday
          </option>

          <option value="Wednesday">
            Wednesday
          </option>

          <option value="Thursday">
            Thursday
          </option>

          <option value="Friday">
            Friday
          </option>

          <option value="Saturday">
            Saturday
          </option>
        </select>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Teacher
          </option>

          {teachers.map(
            (teacher) => (
              <option
                key={teacher._id}
                value={teacher._id}
              >
                {teacher.name}
              </option>
            )
          )}
        </select>

        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          style={inputStyle}
        />

      </div>

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
          ? "Update Timetable"
          : "Add Timetable"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Timetable;