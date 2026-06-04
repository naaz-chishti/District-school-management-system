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

function Users() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const id =
    searchParams.get(
      "id"
    );

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
    if (id) {
      fetchUser();
    }
  }, [id]);

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
            user.schoolId?._id ||
            "",
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

          alert(
            "User Updated Successfully"
          );

        } else {

          await API.post(
            "/users/create",
            formData
          );

          alert(
            "User Created Successfully"
          );
        }

        navigate(
          "/user-list"
        );

      } catch (error) {

        console.log(
          error.response
            ?.data
        );

        alert(
          error.response
            ?.data
            ?.message ||
          "Something went wrong"
        );
      }
    };

  return (
    <DashboardLayout>

      <h1>
        {id
          ? "Edit User"
          : "Add User"}
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          required
        />

        <br /><br />

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

        <br /><br />

        {!id && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
            />

            <br /><br />
          </>
        )}

        <select
          name="role"
          value={
            formData.role
          }
          onChange={
            handleChange
          }
          required
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

        <br /><br />

        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          value={
            formData.schoolId
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
        />

        <br /><br />

        <button
          type="submit"
        >
          {id
            ? "Update User"
            : "Create User"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Users;