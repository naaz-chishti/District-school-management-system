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

          alert(
            "Teacher Updated Successfully"
          );

          navigate(
            "/teacher-list"
          );
          
        } else {

          await API.post(
            "/teachers/add",
            formData
          );

          alert(
            "Teacher Added Successfully"
          );
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

  return (
    <DashboardLayout>

      <h1>
        Teachers
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
            name="teacherId"
            placeholder="Teacher ID"
            value={
              formData.teacherId
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
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
            name="subject"
            placeholder="Subject"
            value={
              formData.subject
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={
              formData.qualification
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={
              formData.salary
            }
            onChange={
              handleChange
            }
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

        </div>

        <button
          type="submit"
          style={{
            width:
              "100%",
            background:
              "#2563eb",
            color:
              "white",
            padding:
              "14px",
            border:
              "none",
            borderRadius:
              "10px",
            marginTop:
              "20px"
          }}
        >
          {
            editId
              ? "Update Teacher"
              : "Add Teacher"
          }
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Teachers;