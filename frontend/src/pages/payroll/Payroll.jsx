import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Payroll() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const payrollId =
    searchParams.get(
      "id"
    );

  const [
    teachers,
    setTeachers
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
    teacherId: "",
    schoolId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    month: "",
    year: "",
    paymentStatus: "",
    performanceRating: "",
    remarks: ""
  });

  // Get Teachers
  const getTeachers =
    async () => {

      try {

        const res =
          await API.get(
            "/teachers/all"
          );

        setTeachers(
          res.data.teachers
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

  // Get Single Payroll
  const getSinglePayroll =
    async () => {

      try {

        const res =
          await API.get(
            "/payroll/all"
          );

        const payroll =
          res.data.payrolls.find(
            (p) =>
              p._id ===
              payrollId
          );

        if (
          payroll
        ) {

          setEditId(
            payroll._id
          );

          setFormData({
            teacherId:
              payroll
                .teacherId
                ?._id || "",
            schoolId:
              payroll
                .schoolId
                ?._id || "",
            basicSalary:
              payroll.basicSalary,
            allowances:
              payroll.allowances,
            deductions:
              payroll.deductions,
            month:
              payroll.month,
            year:
              payroll.year,
            paymentStatus:
              payroll.paymentStatus,
            performanceRating:
              payroll.performanceRating,
            remarks:
              payroll.remarks
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getTeachers();
    getSchools();

    if (
      payrollId
    ) {
      getSinglePayroll();
    }

  }, []);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          editId
        ) {

          await API.put(
            `/payroll/update/${editId}`,
            formData
          );

          alert(
            "Payroll Updated Successfully"
          );

        } else {

          await API.post(
            "/payroll/add",
            formData
          );

          alert(
            "Payroll Added Successfully"
          );
        }

        navigate(
          "/payroll-list"
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
          💰 {editId
            ? "Edit Payroll"
            : "Add Payroll"}
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginTop: "8px"
          }}
        >
          Manage teacher salary and payroll records
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
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Teacher
            </option>

            {teachers.map(
              (teacher) => (
                <option
                  key={teacher._id}
                  value={teacher._id}
                >
                  {teacher.name}
                </option>
              )
            )}
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

          <input
            type="number"
            name="basicSalary"
            placeholder="Basic Salary"
            value={formData.basicSalary}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="allowances"
            placeholder="Allowances"
            value={formData.allowances}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="deductions"
            placeholder="Deductions"
            value={formData.deductions}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Month
            </option>

            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">
              Payment Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="paid">
              Paid
            </option>
          </select>

          <input
            type="number"
            name="performanceRating"
            placeholder="Performance Rating (1-5)"
            value={formData.performanceRating}
            onChange={handleChange}
            style={inputStyle}
          />

        </div>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px 15px",
            border:
              "1px solid #D1D5DB",
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
            ? "Update Payroll"
            : "Add Payroll"}
        </button>

      </form>

    </div>

  </DashboardLayout>
);
}

export default Payroll;