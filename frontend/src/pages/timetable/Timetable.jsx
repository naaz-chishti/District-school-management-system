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

  return (
    <DashboardLayout>

      <h1>
        Timetable
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

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
          required
        />

        <br />
        <br />

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
          required
        />

        <br />
        <br />

        <select
          name="day"
          value={
            formData.day
          }
          onChange={
            handleChange
          }
          required
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

        <br />
        <br />

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
          required
        />

        <br />
        <br />

        <select
          name="teacherId"
          value={
            formData.teacherId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Teacher
          </option>

          {teachers.map(
            (
              teacher
            ) => (
              <option
                key={
                  teacher._id
                }
                value={
                  teacher._id
                }
              >
                {
                  teacher.name
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <input
          type="time"
          name="startTime"
          value={
            formData.startTime
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="time"
          name="endTime"
          value={
            formData.endTime
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <button
          type="submit"
        >
          {
            editId
              ? "Update Timetable"
              : "Add Timetable"
          }
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Timetable;