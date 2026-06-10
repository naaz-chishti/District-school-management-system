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
    searchParams.get("id");

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

          toast.success(
            "School Updated Successfully"
          );

        } else {

          await API.post(
            "/schools/create",
            formData
          );

          toast.success(
            "School Added Successfully"
          );
        }

        setTimeout(() => {

          navigate(
            "/school-list"
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
              color: "#111827",
              fontSize: "32px",
              fontWeight: "700"
            }}
          >
            🏫 {id
              ? "Edit School"
              : "Add School"}
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: "8px"
            }}
          >
            Manage school information and details
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
              name="schoolName"
              placeholder="School Name"
              value={
                formData.schoolName
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="schoolCode"
              placeholder="School Code"
              value={
                formData.schoolCode
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              value={
                formData.district
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="principalName"
              placeholder="Principal Name"
              value={
                formData.principalName
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="School Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <textarea
              name="address"
              placeholder="School Address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              required
              style={{
                ...inputStyle,
                minHeight: "120px",
                gridColumn:
                  "1 / span 2"
              }}
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
              cursor: "pointer",
              boxShadow:
                "0 6px 15px rgba(37,99,235,0.3)"
            }}
          >
            {id
              ? "Update School"
              : "Add School"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default Schools;