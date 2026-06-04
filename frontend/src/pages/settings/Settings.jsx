import {
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Settings() {

  const [formData,
    setFormData] =
    useState({
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

        alert(
          "Settings Saved Successfully"
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  return (
    <DashboardLayout>

      <h1>
        Add Settings
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
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="email"
          name="schoolEmail"
          placeholder="School Email"
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="schoolPhone"
          placeholder="School Phone"
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="academicYear"
          placeholder="Academic Year"
          onChange={
            handleChange
          }
        />

        <br /><br />

        <input
          type="text"
          name="timezone"
          placeholder="Timezone"
          onChange={
            handleChange
          }
        />

        <br /><br />

        <button
          type="submit"
        >
          Save Settings
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Settings;