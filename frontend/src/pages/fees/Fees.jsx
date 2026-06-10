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

function Fees() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const feeId =
    searchParams.get(
      "id"
    );

  const [
    students,
    setStudents
  ] = useState([]);

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
    studentId: "",
    schoolId: "",
    totalFee: "",
    paidAmount: "",
    remainingAmount: "",
    paymentStatus: "",
    paymentMethod: ""
  });

  // Get Students
  const getStudents =
    async () => {
      try {

        const res =
          await API.get(
            "/students/all"
          );

        setStudents(
          res.data.students
        );

      } catch (error) {
        console.log(error);
      }
    };

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

  // Get Single Fee
  const getSingleFee =
    async () => {

      try {

        const res =
          await API.get(
            "/fees/all"
          );

        const fee =
          res.data.fees.find(
            (f) =>
              f._id ===
              feeId
          );

        if (
          fee
        ) {

          setEditId(
            fee._id
          );

          setFormData({
            studentId:
              fee.studentId
                ?._id || "",
            schoolId:
              fee.schoolId
                ?._id || "",
            totalFee:
              fee.totalFee ||
              "",
            paidAmount:
              fee.paidAmount ||
              "",
            remainingAmount:
              fee.remainingAmount ||
              "",
            paymentStatus:
              fee.paymentStatus ||
              "",
            paymentMethod:
              fee.paymentMethod ||
              ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getStudents();
    getSchools();

    if (
      feeId
    ) {
      getSingleFee();
    }

  }, [feeId]);

  // Handle Input
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  // Submit Form
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          editId
        ) {

          await API.put(
            `/fees/update/${editId}`,
            formData
          );

          alert(
            "Fee Updated Successfully"
          );

          navigate(
            "/fee-list"
          );

        } else {

          await API.post(
            "/fees/add",
            formData
          );

          alert(
            "Fee Added Successfully"
          );
        }

        setFormData({
          studentId: "",
          schoolId: "",
          totalFee: "",
          paidAmount: "",
          remainingAmount: "",
          paymentStatus: "",
          paymentMethod: ""
        });

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
        💰 {editId ? "Edit Fee" : "Add Fee"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Manage student fee payments and records
      </p>
    </div>

    <form onSubmit={handleSubmit}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >

        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name}
            </option>
          ))}
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

        <input
          type="number"
          name="totalFee"
          placeholder="Total Fee"
          value={formData.totalFee}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={formData.paidAmount}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="remainingAmount"
          placeholder="Remaining Amount"
          value={formData.remainingAmount}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Payment Status
          </option>

          <option value="paid">
            ✅ Paid
          </option>

          <option value="partial">
            🟡 Partial
          </option>

          <option value="pending">
            🔴 Pending
          </option>
        </select>

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Payment Method
          </option>

          <option value="cash">
            Cash
          </option>

          <option value="online">
            Online
          </option>

          <option value="upi">
            UPI
          </option>

          <option value="bank_transfer">
            Bank Transfer
          </option>
        </select>

      </div>

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
          ? "Update Fee"
          : "Add Fee"}
      </button>

    </form>

  </div>

</DashboardLayout>
  );
}

export default Fees;