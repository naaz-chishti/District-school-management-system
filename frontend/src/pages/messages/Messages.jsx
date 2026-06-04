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
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1>
        Message
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <select
          name="receiverId"
          value={
            formData.receiverId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Receiver
          </option>

          {users.map(
            (user) => (
              <option
                key={
                  user._id
                }
                value={
                  user._id
                }
              >
                {user.name}
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={
            formData.title
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <textarea
          name="message"
          placeholder="Message"
          value={
            formData.message
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <select
          name="messageType"
          value={
            formData.messageType
          }
          onChange={
            handleChange
          }
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

        <br />
        <br />

        <button type="submit">
          {messageId
            ? "Update Message"
            : "Send Message"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Message;