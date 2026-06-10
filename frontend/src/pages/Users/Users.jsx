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

function Users() {

const navigate =
useNavigate();

const [
searchParams
] =
useSearchParams();

const id =
searchParams.get("id");

const [schools,
setSchools] =
useState([]);

const [formData,
setFormData] =
useState({
name: "",
email: "",
password: "",
role: "",
schoolId: "",
phone: ""
});

useEffect(() => {

fetchSchools();

if (id) {
  fetchUser();
}

}, [id]);

const fetchSchools =
async () => {

  try {

    const res =
      await API.get(
        "/schools/all"
      );

    setSchools(
      res.data.schools || []
    );

  } catch (error) {

    console.log(error);
  }
};

const fetchUser =
async () => {

  try {

    const res =
      await API.get(
        `/users/${id}`
      );

    const user =
      res.data.user;

    setFormData({
      name:
        user.name || "",
      email:
        user.email || "",
      password: "",
      role:
        user.role || "",
      schoolId:
        user.schoolId?._id || "",
      phone:
        user.phone || ""
    });

  } catch (error) {

    console.log(error);
  }
};

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

    if (id) {

      await API.put(
        `/users/update/${id}`,
        formData
      );

      toast.success(
        "User Updated Successfully"
      );

    } else {

      await API.post(
        "/users/create",
        formData
      );

      toast.success(
        "User Created Successfully"
      );
    }

    setTimeout(() => {

      navigate(
        "/user-list"
      );

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
          fontSize: "32px",
          color: "#111827"
        }}
      >
        👤 {id
          ? "Edit User"
          : "Add User"}
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px"
        }}
      >
        Create and manage system users
      </p>

    </div>

    <form
      onSubmit={
        handleSubmit
      }
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px"
        }}
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
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

        {!id && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        )}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">
            Select Role
          </option>

          <option value="district_admin">
            District Admin
          </option>

          <option value="school_admin">
            School Admin
          </option>

          <option value="teacher">
            Teacher
          </option>

          <option value="student">
            Student
          </option>

          <option value="parent">
            Parent
          </option>
        </select>

        <select
          name="schoolId"
          value={formData.schoolId}
          onChange={handleChange}
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
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

      </div>

      <button
        type="submit"
        style={{
          marginTop: "25px",
          width: "100%",
          background:
            "linear-gradient(135deg,#2563EB,#3B82F6)",
          color: "#fff",
          border: "none",
          padding: "14px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        {id
          ? "Update User"
          : "Create User"}
      </button>

    </form>

  </div>

</DashboardLayout>

);
}

export default Users;
