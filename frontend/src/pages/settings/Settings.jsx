import {
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function Settings() {

  const [
    formData,
    setFormData
  ] = useState({
    schoolName: "",
    schoolEmail: "",
    schoolPhone: "",
    academicYear: "",
    timezone: ""
  });

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

        await API.post(
          "/settings/save",
          formData
        );

        toast.success(
          "Settings Saved Successfully"
        );

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
              fontSize: "32px"
            }}
          >
            ⚙️ System Settings
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: "8px"
            }}
          >
            Configure school information and ERP preferences
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
              type="email"
              name="schoolEmail"
              placeholder="School Email"
              value={
                formData.schoolEmail
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="schoolPhone"
              placeholder="School Phone"
              value={
                formData.schoolPhone
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="academicYear"
              placeholder="Academic Year (2025-2026)"
              value={
                formData.academicYear
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <select
              name="timezone"
              value={
                formData.timezone
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            >
              <option value="">
                Select Timezone
              </option>

              <option value="Asia/Kolkata">
                Asia/Kolkata
              </option>

              <option value="Asia/Dubai">
                Asia/Dubai
              </option>

              <option value="Europe/London">
                Europe/London
              </option>

              <option value="America/New_York">
                America/New_York
              </option>

            </select>

          </div>

          <div
            style={{
              marginTop: "25px",
              background: "#F9FAFB",
              padding: "20px",
              borderRadius: "12px",
              border:
                "1px solid #E5E7EB"
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#111827"
              }}
            >
              Academic Information
            </h3>

            <p
              style={{
                color: "#6B7280",
                marginBottom: 0
              }}
            >
              Current academic year and timezone settings will be applied throughout the School ERP system.
            </p>
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
            Save Settings
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default Settings;