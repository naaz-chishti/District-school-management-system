import {
  useEffect,
  useState
} from "react";
import {
  useNavigate
} from "react-router-dom";

import {
  useSearchParams
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Teachers() {

  const [
    searchParams
  ] =
    useSearchParams();

    const navigate =
  useNavigate();

  const teacherId =
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
    teacherId: "",
    name: "",
    email: "",
    subject: "",
    qualification: "",
    salary: "",
    schoolId: ""
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

      } catch (error) {
        console.log(error);
      }
    };

  // Get Single Teacher
  const getSingleTeacher =
    async () => {

      try {

        const res =
          await API.get(
            "/teachers/all"
          );

        const teacher =
          res.data.teachers.find(
            (t) =>
              t._id ===
              teacherId
          );

        if (
          teacher
        ) {

          setEditId(
            teacher._id
          );

          setFormData({
            teacherId:
              teacher.teacherId,
            name:
              teacher.name,
            email:
              teacher.email,
            subject:
              teacher.subject,
            qualification:
              teacher.qualification,
            salary:
              teacher.salary,
            schoolId:
              teacher
                .schoolId
                ?._id || ""
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {

    getSchools();

    if (
      teacherId
    ) {
      getSingleTeacher();
    }

  }, []);

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
            `/teachers/update/${editId}`,
            formData
          );

         toast.success("Teacher Updated Successfully");

          navigate(
            "/teacher-list"
          );
          
        } else {

          await API.post(
            "/teachers/add",
            formData
          );

          toast.success("Teacher Added Successfully");
        }

        setFormData({
          teacherId: "",
          name: "",
          email: "",
          subject: "",
          qualification: "",
          salary: "",
          schoolId: ""
        });

      } catch (error) {
        console.log(error);
        toast.error("data already exists");
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
          👨‍🏫 {editId ? "Edit Teacher" : "Add Teacher"}
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginTop: "8px"
          }}
        >
          Manage teacher information and assignments
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

          <input
            type="text"
            name="teacherId"
            placeholder="Teacher ID"
            value={formData.teacherId}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
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
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
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
            ? "Update Teacher"
            : "Add Teacher"}
        </button>

      </form>

    </div>

  </DashboardLayout>
);
}

export default Teachers;