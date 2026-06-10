import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";

function AuditLog() {

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData
  ] = useState({
    action: "",
    module: "",
    details: ""
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
          "/audit/add",
          formData
        );

        toast.success(
          "Audit Log Added Successfully"
        );

        setFormData({
          action: "",
          module: "",
          details: ""
        });

        navigate(
          "/audit-list"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
          "Something went wrong"
        );
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
            📋 Audit Log
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: "8px"
            }}
          >
            Track and manage system activities and user actions
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
              name="action"
              placeholder="Action"
              value={
                formData.action
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="module"
              placeholder="Module"
              value={
                formData.module
              }
              onChange={
                handleChange
              }
              required
              style={inputStyle}
            />

          </div>

          <textarea
            name="details"
            placeholder="Audit Details"
            value={
              formData.details
            }
            onChange={
              handleChange
            }
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "1px solid #D1D5DB",
              borderRadius: "10px",
              fontSize: "14px",
              marginTop: "20px",
              minHeight: "150px",
              resize: "none",
              boxSizing: "border-box"
            }}
          />

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
            Add Audit Log
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default AuditLog;