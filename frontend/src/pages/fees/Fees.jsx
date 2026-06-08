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

  return (
    <DashboardLayout>

      <h1>
        {
          editId
            ? "Edit Fee"
            : "Add Fee"
        }
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          background:
            "white",
          padding:
            "20px",
          borderRadius:
            "10px"
        }}
      >

        <select
          name="studentId"
          value={
            formData.studentId
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Student
          </option>

          {students.map(
            (
              student
            ) => (
              <option
                key={
                  student._id
                }
                value={
                  student._id
                }
              >
                {
                  student.name
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

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

        <br />
        <br />

        <input
          type="number"
          name="totalFee"
          placeholder="Total Fee"
          value={
            formData.totalFee
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={
            formData.paidAmount
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="number"
          name="remainingAmount"
          placeholder="Remaining Amount"
          value={
            formData.remainingAmount
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <select
          name="paymentStatus"
          value={
            formData.paymentStatus
          }
          onChange={
            handleChange
          }
          required
        >
          <option value="">
            Select Status
          </option>

          <option value="paid">
            Paid
          </option>

          <option value="partial">
            Partial
          </option>

          <option value="pending">
            Pending
          </option>
        </select>

        <br />
        <br />

        <select
          name="paymentMethod"
          value={
            formData.paymentMethod
          }
          onChange={
            handleChange
          }
          required
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

        <br />
        <br />

        <button
          type="submit"
        >
          {
            editId
              ? "Update Fee"
              : "Add Fee"
          }
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Fees;