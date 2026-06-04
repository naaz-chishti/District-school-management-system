import { useState } from "react";
import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaUserCircle } from "react-icons/fa";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [name, setName] =
    useState(user?.name || "");

  const [phone, setPhone] =
    useState(user?.phone || "");

  const [email] =
    useState(user?.email || "");

  const handleUpdate =
    async () => {

      try {

        const res =
          await API.put(
  `/users/update/${user._id}`,
  {
    name,
    phone
  }
);
        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );
      }
    };

  return (
    <DashboardLayout>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.08)",
          maxWidth: "700px"
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          <FaUserCircle
            size={90}
            color="#2563eb"
          />

          <h2>
            My Profile
          </h2>
        </div>

        <label>
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <label>
          Phone
        </label>

        <input
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <label>
          Email
        </label>

        <input
          type="text"
          value={email}
          disabled
          style={{
            ...inputStyle,
            background:
              "#f3f4f6"
          }}
        />

        <button
          onClick={
            handleUpdate
          }
          style={{
            background:
              "#2563eb",
            color: "#fff",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "8px",
            cursor:
              "pointer",
            marginTop:
              "20px"
          }}
        >
          Update Profile
        </button>

      </div>

    </DashboardLayout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "15px",
  border:
    "1px solid #ddd",
  borderRadius: "8px"
};

export default Profile;