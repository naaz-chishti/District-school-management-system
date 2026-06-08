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

  return (
    <DashboardLayout>

      <h1>
        Payroll
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <select
          name="teacherId"
          value={
            formData.teacherId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Teacher
          </option>

          {teachers.map(
            (
              teacher
            ) => (
              <option
                key={
                  teacher._id
                }
                value={
                  teacher._id
                }
              >
                {
                  teacher.name
                }
              </option>
            )
          )}
        </select>

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

        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={
            formData.basicSalary
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <input
          type="number"
          name="allowances"
          placeholder="Allowances"
          value={
            formData.allowances
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={
            formData.deductions
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="month"
          placeholder="Month"
          value={
            formData.month
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={
            formData.year
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

        <select
          name="paymentStatus"
          value={
            formData.paymentStatus
          }
          onChange={
            handleChange
          }
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

        <br /><br />

        <input
          type="number"
          name="performanceRating"
          placeholder="Performance Rating (1-5)"
          value={
            formData.performanceRating
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={
            formData.remarks
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <button
          type="submit"
        >
          {editId
            ? "Update Payroll"
            : "Add Payroll"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Payroll;