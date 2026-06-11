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

function Notifications() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const id =
    searchParams.get(
      "id"
    );

 const [formData,
  setFormData] =
  useState({
    title: "",
    message: "",
    sentTo: "all",
    priority: "normal",
    studentIds: [],
    schoolId: ""
  });

  const [schools, setSchools] = useState([]);
const [students, setStudents] = useState([]);

const getSchools = async () => {
  try {
    const res = await API.get("/schools/all");
    setSchools(res.data.schools || []);
  } catch (error) {
    console.log(error);
  }
};

const fetchStudents = async () => {
  try {
    const res = await API.get("/students/all");
    setStudents(res.data.students || []);
  } catch (error) {
    console.log(error);
  }
};

 useEffect(() => {

  getSchools();
  fetchStudents();

  if (id) {
    fetchNotification();
  }

}, [id]);

  const fetchNotification =
    async () => {

      try {

        const res =
          await API.get(
            `/notifications/${id}`
          );

        setFormData({
          title:
            res.data
              .notification
              .title || "",

          message:
            res.data
              .notification
              .message || "",

          sentTo:
            res.data
              .notification
              .sentTo || "all",

          schoolId:
            res.data
              .notification
              .schoolId?._id ||
            res.data
              .notification
              .schoolId ||  "",

              priority:
  res.data.notification.priority ||
  "normal",

studentIds:
  res.data.notification.studentIds ||
  [],
        });

      } catch (error) {

        console.log(
          error
        );
      }
    };

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

        if (id) {

          await API.put(
            `/notifications/update/${id}`,
            formData
          );

          alert(
            "Notification Updated Successfully"
          );

        } else {

          await API.post(
            "/notifications/send",
            formData
          );

          alert(
            "Notification Added Successfully"
          );
        }

        navigate(
          "/notification-list"
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
        🔔 {id
          ? "Edit Notification"
          : "Send Notification"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Send announcements and important messages
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

        {
  formData.sentTo ===
    "selected_students" && (

    <div
      style={{
        marginTop: "20px"
      }}
    >

      <label
        style={{
          fontWeight: "600",
          display: "block",
          marginBottom: "10px"
        }}
      >
        Select Students
      </label>

      <select
        multiple
        style={{
          ...inputStyle,
          minHeight: "180px"
        }}
        onChange={(e) => {

          const selected =
            Array.from(
              e.target.selectedOptions
            ).map(
              option =>
                option.value
            );

          setFormData({
            ...formData,
            studentIds:
              selected
          });
        }}
      >

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

    </div>
  )
}

        <input
          type="text"
          name="title"
          placeholder="Notification Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
  name="sentTo"
  value={formData.sentTo}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="all">
    All Users
  </option>

  <option value="students">
    All Students
  </option>

  <option value="teachers">
    All Teachers
  </option>

  <option value="parents">
    All Parents
  </option>

  <option value="selected_students">
    Selected Students
  </option>
</select>

        <select
  name="priority"
  value={formData.priority}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="normal">
    Normal Priority
  </option>

  <option value="important">
    Important
  </option>

  <option value="urgent">
    Urgent
  </option>
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

  {schools.map((school) => (
    <option
      key={school._id}
      value={school._id}
    >
      {school.schoolName}
    </option>
  ))}
</select>

      </div>

      <textarea
        name="message"
        placeholder="Notification Message"
        value={formData.message}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px 15px",
          border: "1px solid #D1D5DB",
          borderRadius: "10px",
          fontSize: "14px",
          marginTop: "20px",
          minHeight: "150px",
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
        {id
          ? "Update Notification"
          : "Send Notification"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Notifications;