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

function Students() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const studentId =
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

  const [formData, setFormData] = useState({
  studentId: "",
  name: "",
  email: "",
  dob: "",
  class: "",
  section: "",
  rollNumber: "",
  schoolId: "",
  gender: "",
  address: "",

  fatherName: "",
  fatherPhone: "",
  fatherOccupation: "",

  motherName: "",
  motherOccupation: ""
});

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

      }catch (error) {

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

  console.log(error);
}
    };

  // Get Single Student
const getSingleStudent =
  async () => {

    try {

      const res =
        await API.get(
          `/students/${studentId}`
        );

      const student =
        res.data.student;

      setEditId(
        student._id
      );

      setFormData({
  studentId: student.studentId || "",
  name: student.name || "",
  email: student.email || "",
  dob: student.dob
    ? student.dob.split("T")[0]
    : "",
  class: student.class || "",
  section: student.section || "",
  rollNumber: student.rollNumber || "",
  schoolId: student.schoolId?._id || "",
  gender: student.gender || "",
  address: student.address || "",

  fatherName:
    student.fatherName || "",

  fatherPhone:
    student.fatherPhone || "",

  fatherOccupation:
    student.fatherOccupation || "",

  motherName:
    student.motherName || "",

  motherOccupation:
    student.motherOccupation || ""
});

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    getSchools();

  }, []);

  useEffect(() => {

    if (
      studentId
    ) {
      getSingleStudent();
    }

  }, [
    studentId
  ]);

  // Handle Change
 const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  // Submit Form
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editId) {

      await API.put(
        `/students/update/${editId}`,
        formData
      );

      toast.success(
        "Student Updated Successfully"
      );

    } else {

      await API.post(
        "/students/add",
        formData
      );

      toast.success(
        "Student Added Successfully"
      );
    }

    setTimeout(() => {
      navigate("/student-list");
    }, 1000);

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
  padding: "12px 16px",
  border: "1px solid #d1d5db",
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
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
          🎓 {editId ? "Edit Student" : "Add Student"}
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginTop: "8px"
          }}
        >
         <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  }}
>
  <div>
    <h1
      style={{
        margin: 0,
        color: "#111827"
      }}
    >
      Student Admission Form
    </h1>

    <p
      style={{
        color: "#6B7280",
        marginTop: "5px"
      }}
    >
      Enter student and parent information
    </p>
  </div>

  <div
    style={{
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      background: "#f3f4f6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "40px"
    }}
  >
    👨‍🎓
  </div>
</div>
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <h3
  style={{
    marginTop: "35px",
    marginBottom: "20px",
    color: "#2563eb",
    background: "#eff6ff",
    padding: "12px 15px",
    borderRadius: "10px"
  }}
>
  Student Information
</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}
        >

          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

<input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  style={inputStyle}
/>

          <input
            type="text"
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="section"
            placeholder="Section"
            value={formData.section}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />

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

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">
              Select Gender
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>

            <option value="other">
              Other
            </option>
          </select>
</div>

<h3
  style={{
    marginTop: "35px",
    marginBottom: "20px",
    color: "#16a34a",
    background: "#f0fdf4",
    padding: "12px 15px",
    borderRadius: "10px"
  }}
>
  Father Information
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  }}
>
  <input
    type="text"
    name="fatherName"
    placeholder="Father Name"
    value={formData.fatherName}
    onChange={handleChange}
    style={inputStyle}
  />

  <input
    type="text"
    name="fatherPhone"
    placeholder="Father Mobile Number"
    value={formData.fatherPhone}
    onChange={handleChange}
    style={inputStyle}
  />

  <input
    type="text"
    name="fatherOccupation"
    placeholder="Father Occupation"
    value={formData.fatherOccupation}
    onChange={handleChange}
    style={inputStyle}
  />
</div>


        <h3
  style={{
    marginTop: "35px",
    marginBottom: "20px",
    color: "#16a34a",
    background: "#f0fdf4",
    padding: "12px 15px",
    borderRadius: "10px"
  }}
>
  Mother Information
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  }}
>
  <input
    type="text"
    name="motherName"
    placeholder="Mother Name"
    value={formData.motherName}
    onChange={handleChange}
    style={inputStyle}
  />

  <input
    type="text"
    name="motherOccupation"
    placeholder="Mother Occupation"
    value={formData.motherOccupation}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

<h3
  style={{
    marginTop: "35px",
    marginBottom: "20px",
    color: "#7c3aed",
    background: "#f5f3ff",
    padding: "12px 15px",
    borderRadius: "10px"
  }}
>
  Address Information
</h3>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px 15px",
            border: "1px solid #D1D5DB",
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
  marginTop: "30px",
  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#fff",
  border: "none",
  padding: "16px",
  borderRadius: "12px",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(37,99,235,0.3)"
}}
        >
          {editId
            ? "Update Student"
            : "Add Student"}
        </button>

      </form>
    </div>

  </DashboardLayout>
);
}

export default Students;