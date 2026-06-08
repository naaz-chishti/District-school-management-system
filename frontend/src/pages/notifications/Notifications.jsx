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

  return (
    <DashboardLayout>

      <h1>
        {id
          ? "Edit Notification"
          : "Add Notification"}
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

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
          name="sentTo"
          value={
            formData.sentTo
          }
          onChange={
            handleChange
          }
        >
          <option value="all">
            All
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

        <br />
        <br />

        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          value={
            formData.schoolId
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
          {id
            ? "Update Notification"
            : "Add Notification"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Notifications;