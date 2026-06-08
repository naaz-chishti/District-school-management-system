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

  const [
    formData,
    setFormData
  ] = useState({
    studentId: "",
    name: "",
    email: "",
    class: "",
    section: "",
    rollNumber: "",
    schoolId: "",
    gender: "",
    address: ""
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
        studentId:
          student.studentId || "",
        name:
          student.name || "",
        email:
          student.email || "",
        class:
          student.class || "",
        section:
          student.section || "",
        rollNumber:
          student.rollNumber || "",
        schoolId:
          student.schoolId?._id || "",
        gender:
          student.gender || "",
        address:
          student.address || ""
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
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
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

  return (
    <DashboardLayout>

      <h1>
        {
          editId
            ? "Edit Student"
            : "Add Student"
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
            "30px",
          borderRadius:
            "15px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap:
              "15px"
          }}
        >

          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={
              formData.studentId
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="class"
            placeholder="Class"
            value={
              formData.class
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="section"
            placeholder="Section"
            value={
              formData.section
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={
              formData.rollNumber
            }
            onChange={
              handleChange
            }
            required
          />

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

          <select
            name="gender"
            value={
              formData.gender
            }
            onChange={
              handleChange
            }
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

        <textarea
          name="address"
          placeholder="Address"
          value={
            formData.address
          }
          onChange={
            handleChange
          }
          style={{
            width:
              "100%",
            marginTop:
              "15px",
            minHeight:
              "100px"
          }}
        />

        <button
          type="submit"
          style={{
            width:
              "100%",
            marginTop:
              "20px",
            background:
              "#2563eb",
            color:
              "white",
            padding:
              "12px",
            border:
              "none",
            borderRadius:
              "10px"
          }}
        >
          {
            editId
              ? "Update Student"
              : "Add Student"
          }
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Students;