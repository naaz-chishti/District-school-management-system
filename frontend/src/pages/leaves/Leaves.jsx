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

function Leaves() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const leaveId =
    searchParams.get(
      "id"
    );

  const [
    editId,
    setEditId
  ] = useState(null);

  const [
    formData,
    setFormData
  ] = useState({
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: ""
  });

  const getSingleLeave =
    async () => {

      try {

        const res =
          await API.get(
            "/leaves/all"
          );

        const leave =
          res.data.leaves.find(
            (l) =>
              l._id ===
              leaveId
          );

        if (leave) {

          setEditId(
            leave._id
          );

          setFormData({
            leaveType:
              leave.leaveType,
            reason:
              leave.reason,
            startDate:
              leave.startDate
                ?.split("T")[0],
            endDate:
              leave.endDate
                ?.split("T")[0]
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    if (leaveId) {
      getSingleLeave();
    }

  }, [leaveId]);

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
            `/leaves/update/${editId}`,
            formData
          );

          alert(
            "Leave Updated Successfully"
          );

        } else {

          await API.post(
            "/leaves/apply",
            formData
          );

          alert(
            "Leave Applied Successfully"
          );
        }

        navigate(
          "/leave-list"
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
        Leaves
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <select
          name="leaveType"
          value={
            formData.leaveType
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Leave
          </option>

          <option value="sick">
            Sick
          </option>

          <option value="casual">
            Casual
          </option>

          <option value="emergency">
            Emergency
          </option>

        </select>

        <br /><br />

        <textarea
          name="reason"
          placeholder="Reason"
          value={
            formData.reason
          }
          onChange={
            handleChange
          }
          required
        />

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

        <button
          type="submit"
        >
          {editId
            ? "Update Leave"
            : "Apply Leave"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Leaves;