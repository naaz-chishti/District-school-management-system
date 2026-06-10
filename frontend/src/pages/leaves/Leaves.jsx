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
        maxWidth: "1000px",
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
          📝 {editId
            ? "Edit Leave"
            : "Apply Leave"}
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginTop: "8px"
          }}
        >
          Apply and manage leave requests
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "20px"
          }}
        >

          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Leave Type
            </option>

            <option value="sick">
              🤒 Sick Leave
            </option>

            <option value="casual">
              🏖 Casual Leave
            </option>

            <option value="emergency">
              🚨 Emergency Leave
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

        </div>

        <textarea
          name="reason"
          placeholder="Enter Leave Reason"
          value={formData.reason}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px 15px",
            border:
              "1px solid #D1D5DB",
            borderRadius: "10px",
            fontSize: "14px",
            marginTop: "20px",
            minHeight: "140px",
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
            ? "Update Leave"
            : "Apply Leave"}
        </button>

      </form>

    </div>

  </DashboardLayout>
);
}

export default Leaves;