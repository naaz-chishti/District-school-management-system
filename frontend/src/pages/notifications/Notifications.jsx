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

  const [
    formData,
    setFormData
  ] =
    useState({
      title: "",
      message: "",
      sentTo: "all",
      schoolId: ""
    });

  useEffect(() => {

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
              .schoolId ||
            ""
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
            Students
          </option>

          <option value="teachers">
            Teachers
          </option>

          <option value="parents">
            Parents
          </option>
        </select>

        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          value={formData.schoolId}
          onChange={handleChange}
          required
          style={inputStyle}
        />

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