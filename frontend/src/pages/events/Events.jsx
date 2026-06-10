import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Events() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const eventId =
    searchParams.get(
      "id"
    );

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
    title: "",
    description: "",
    eventType: "",
    startDate: "",
    endDate: "",
    schoolId: "",
    status: ""
  });

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

  const getSingleEvent =
    async () => {
      try {

        const res =
          await API.get(
            "/events/all"
          );

        const event =
          res.data.events.find(
            (e) =>
              e._id ===
              eventId
          );

        if (event) {

          setEditId(
            event._id
          );

          setFormData({
            title:
              event.title,
            description:
              event.description,
            eventType:
              event.eventType,
            startDate:
              event.startDate
                ?.split("T")[0],
            endDate:
              event.endDate
                ?.split("T")[0],
            schoolId:
              event.schoolId
                ?._id || "",
            status:
              event.status
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getSchools();

    if (eventId) {
      getSingleEvent();
    }

  }, [eventId]);

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
            `/events/update/${editId}`,
            formData
          );

          alert(
            "Event Updated Successfully"
          );

        } else {

          await API.post(
            "/events/add",
            formData
          );

          alert(
            "Event Added Successfully"
          );
        }

        navigate(
          "/event-list"
        );

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
        🎉 {editId
          ? "Edit Event"
          : "Add Event"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Manage school events, holidays, exams and meetings
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

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Event Type
          </option>

          <option value="holiday">
            Holiday
          </option>

          <option value="event">
            Event
          </option>

          <option value="exam">
            Exam
          </option>

          <option value="meeting">
            Meeting
          </option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />

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

          <option value="upcoming">
            Upcoming
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

      </div>

      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px 15px",
          border: "1px solid #D1D5DB",
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
          ? "Update Event"
          : "Add Event"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Events;