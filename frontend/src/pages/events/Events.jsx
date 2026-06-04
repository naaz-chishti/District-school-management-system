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
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1>
        Events
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

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <select
          name="eventType"
          value={
            formData.eventType
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Type
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

        <br /><br />

        <input
          type="date"
          name="startDate"
          value={
            formData.startDate
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <input
          type="date"
          name="endDate"
          value={
            formData.endDate
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

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

        <br /><br />

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

        <br /><br />

        <button
          type="submit"
        >
          {editId
            ? "Update Event"
            : "Add Event"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Events;