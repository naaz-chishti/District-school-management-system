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

function Message() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const messageId =
    searchParams.get("id");

  const [
    formData,
    setFormData
  ] = useState({
    receiverId: "",
    title: "",
    message: "",
    messageType:
      "general"
  });

  const [
    users,
    setUsers
  ] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {

      try {

        const res =
          await API.get(
            "/users/all"
          );

        setUsers(
          res.data.users || []
        );

      } catch (error) {
        console.log(error);
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

        if (
          messageId
        ) {

          await API.put(
            `/messages/update/${messageId}`,
            formData
          );

          alert(
            "Message Updated"
          );

        } else {

          await API.post(
            "/messages/send",
            formData
          );

          alert(
            "Message Sent"
          );
        }

        navigate(
          "/message-list"
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
        💬 {messageId
          ? "Edit Message"
          : "Send Message"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Send messages and announcements to users
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
          name="receiverId"
          value={formData.receiverId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Receiver
          </option>

          {users.map(
            (user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name} ({user.role})
              </option>
            )
          )}
        </select>

        <select
          name="messageType"
          value={formData.messageType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="general">
            General
          </option>

          <option value="important">
            Important
          </option>

          <option value="announcement">
            Announcement
          </option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Message Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

      </div>

      <textarea
        name="message"
        placeholder="Type your message here..."
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
          minHeight: "180px",
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
        {messageId
          ? "Update Message"
          : "Send Message"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Message;