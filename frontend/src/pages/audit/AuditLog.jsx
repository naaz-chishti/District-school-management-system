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

        alert(
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

  return (
    <DashboardLayout>

      <h1>
        Audit Log
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
            "15px"
        }}
      >

        <h2>
          Add Audit Log
        </h2>

        <input
          type="text"
          name="action"
          placeholder="Enter Action"
          value={
            formData.action
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="module"
          placeholder="Enter Module"
          value={
            formData.module
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <textarea
          name="details"
          placeholder="Enter Details"
          value={
            formData.details
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Add Audit Log
        </button>

      </form>

    </DashboardLayout>
  );
}

export default AuditLog;