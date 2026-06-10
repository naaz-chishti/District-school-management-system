import { useState } from "react";
import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FaUserCircle,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

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

    const [showPasswordForm,
  setShowPasswordForm] =
  useState(false);

const [passwordData,
  setPasswordData] =
  useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showOldPassword,
  setShowOldPassword] =
  useState(false);

const [showNewPassword,
  setShowNewPassword] =
  useState(false);

const [showConfirmPassword,
  setShowConfirmPassword] =
  useState(false);

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

    const handlePasswordChange =
  async () => {

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {

      await API.put(
        `/users/change-password/${user._id}`,
        {
          oldPassword:
            passwordData.oldPassword,
          newPassword:
            passwordData.newPassword
        }
      );

      alert(
        "Password Changed Successfully"
      );

      setShowPasswordForm(
        false
      );

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to change password"
      );
    }
  };

  return (
  <DashboardLayout>

    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto"
      }}
    >

      {/* Profile Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >

        {/* Top Banner */}
        <div
          style={{
            height: "140px",
            background:
              "linear-gradient(135deg,#2563EB,#3B82F6)"
          }}
        />

        {/* Profile Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: "-60px",
            padding: "0 30px"
          }}
        >

          <FaUserCircle
            size={120}
            color="#2563EB"
            style={{
              background: "#fff",
              borderRadius: "50%"
            }}
          />

          <h2
            style={{
              marginBottom: "5px",
              color: "#111827"
            }}
          >
            {name}
          </h2>

          <p
            style={{
              color: "#6B7280",
              marginTop: 0
            }}
          >
            {user?.role
              ?.replace("_", " ")
              ?.toUpperCase()}
          </p>

        </div>

        {/* Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "15px",
            padding: "30px"
          }}
        >

          <div style={cardStyle}>
            <h4>User ID</h4>
            <p>{user?._id}</p>
          </div>

          <div style={cardStyle}>
            <h4>Role</h4>
            <p>{user?.role}</p>
          </div>

          <div style={cardStyle}>
            <h4>Status</h4>
            <p>Active</p>
          </div>

          <div style={cardStyle}>
            <h4>School</h4>
            <p>District School</p>
          </div>

        </div>

        {/* Form */}
        <div
          style={{
            padding: "0 30px 30px"
          }}
        >

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "20px"
            }}
          >

            <div>
              <label>Name</label>

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
            </div>

            <div>
              <label>Phone</label>

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
            </div>

            <div>
              <label>Email</label>

              <input
                type="text"
                value={email}
                disabled
                style={{
                  ...inputStyle,
                  background:
                    "#F3F4F6"
                }}
              />
            </div>

            <div>
              <label>Account Status</label>

              <input
                type="text"
                value="Active"
                disabled
                style={{
                  ...inputStyle,
                  background:
                    "#F3F4F6"
                }}
              />
            </div>

          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px"
            }}
          >

            <button
              onClick={handleUpdate}
              style={{
                flex: 1,
                background:
                  "linear-gradient(135deg,#2563EB,#3B82F6)",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600"
              }}
            >
              Save Changes
            </button>

           <button
  type="button"
  onClick={() =>
    setShowPasswordForm(
      !showPasswordForm
    )
  }
  style={{
    flex: 1,
    background: "#fff",
    color: "#2563EB",
    border:
      "2px solid #2563EB",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600"
  }}
>
  Change Password
</button>

          </div>

        </div>

      </div>

    </div>

   {
  showPasswordForm && (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background:
          "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >

      <div
        style={{
          width: "450px",
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.2)"
        }}
      >

        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px"
          }}
        >
          🔒 Change Password
        </h2>

       <div
  style={{
    position: "relative"
  }}
>
  <input
    type={
      showOldPassword
        ? "text"
        : "password"
    }
    placeholder="Current Password"
    value={passwordData.oldPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        oldPassword:
          e.target.value
      })
    }
    style={inputStyle}
  />
  

 <span
  onMouseDown={() =>
    setShowOldPassword(true)
  }
  onMouseUp={() =>
    setShowOldPassword(false)
  }
  onMouseLeave={() =>
    setShowOldPassword(false)
  }
  style={{
    position: "absolute",
    right: "15px",
    top: "20px",
    cursor: "pointer",
    color: "#6B7280"
  }}
>
  <FaEye />
</span>

</div>

        <div
  style={{
    position: "relative"
  }}
>
  <input
    type={
      showNewPassword
        ? "text"
        : "password"
    }
    placeholder="New Password"
    value={passwordData.newPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        newPassword:
          e.target.value
      })
    }
    style={inputStyle}
  />

  <span
  onMouseDown={() =>
    setShowNewPassword(true)
  }
  onMouseUp={() =>
    setShowNewPassword(false)
  }
  onMouseLeave={() =>
    setShowNewPassword(false)
  }
  style={{
    position: "absolute",
    right: "15px",
    top: "20px",
    cursor: "pointer",
    color: "#6B7280"
  }}
>
  <FaEye />
</span>
</div>

        <div
  style={{
    position: "relative"
  }}
>
  <input
    type={
      showConfirmPassword
        ? "text"
        : "password"
    }
    placeholder="Confirm Password"
    value={
      passwordData.confirmPassword
    }
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        confirmPassword:
          e.target.value
      })
    }
    style={inputStyle}
  />

 <span
  onMouseDown={() =>
    setShowConfirmPassword(true)
  }
  onMouseUp={() =>
    setShowConfirmPassword(false)
  }
  onMouseLeave={() =>
    setShowConfirmPassword(false)
  }
  style={{
    position: "absolute",
    right: "15px",
    top: "20px",
    cursor: "pointer",
    color: "#6B7280"
  }}
>
  <FaEye />
</span>
</div>

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >

          <button
            type="button"
            onClick={
              handlePasswordChange
            }
            style={{
              flex: 1,
              background:
                "#16A34A",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Update Password
          </button>

          <button
            type="button"
            onClick={() =>
              setShowPasswordForm(
                false
              )
            }
            style={{
              flex: 1,
              background:
                "#EF4444",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  )
}

  </DashboardLayout>
);
}

const cardStyle = {
  background: "#F9FAFB",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid #E5E7EB"
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginTop: "8px",
  marginBottom: "15px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "14px",
  boxSizing: "border-box"
};

export default Profile;