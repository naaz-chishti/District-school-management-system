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

function Schools() {

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
      schoolName: "",
      schoolCode: "",
      district: "",
      principalName: "",
      email: "",
      phone: "",
      address: "",
      status: "active"
    });

  useEffect(() => {

    if (id) {
      fetchSchool();
    }

  }, [id]);

  const fetchSchool =
    async () => {

      try {

        const res =
          await API.get(
            `/schools/${id}`
          );

        setFormData(
          res.data.school
        );

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
            `/schools/update/${id}`,
            formData
          );

          alert(
            "School Updated Successfully"
          );

        } else {

          await API.post(
            "/schools/create",
            formData
          );

          alert(
            "School Added Successfully"
          );
        }

        navigate(
          "/school-list"
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
        {id
          ? "Edit School"
          : "Add School"}
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          name="schoolName"
          placeholder="School Name"
          value={formData.schoolName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="schoolCode"
          placeholder="School Code"
          value={formData.schoolCode}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="principalName"
          placeholder="Principal Name"
          value={formData.principalName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">

          {id
            ? "Update School"
            : "Add School"}

        </button>

      </form>

    </DashboardLayout>
  );
}

export default Schools;