import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    const [showPassword,
  setShowPassword] =
  useState(false);

const [rememberMe,
  setRememberMe] =
  useState(false);

  const [
  showForgotPassword,
  setShowForgotPassword
] = useState(false);

const [
  resetData,
  setResetData
] = useState({
  email: "",
  newPassword: "",
  confirmPassword: ""
});

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );

     if (rememberMe) {

  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(
      res.data.user
    )
  );

} else {

  sessionStorage.setItem(
    "token",
    res.data.token
  );

  sessionStorage.setItem(
    "user",
    JSON.stringify(
      res.data.user
    )
  );
}

      navigate(
        "/dashboard"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  const handleResetPassword =
  async () => {

    if (
      resetData.newPassword !==
      resetData.confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    try {

      await API.put(
        "/auth/reset-password",
        {
          email:
            resetData.email,
          newPassword:
            resetData.newPassword
        }
      );

      alert(
        "Password Reset Successfully"
      );

      setShowForgotPassword(
        false
      );

      setResetData({
        email: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to Reset Password"
      );
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      background:
        "linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)",
      position: "relative",
      overflow: "hidden"
    }}
  >

    {/* Background Circles */}

    <div
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background:
          "rgba(255,255,255,0.12)",
        borderRadius: "50%",
        top: "-100px",
        left: "-100px"
      }}
    />

    <div
      style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background:
          "rgba(255,255,255,0.08)",
        borderRadius: "50%",
        bottom: "-100px",
        right: "-50px"
      }}
    />

    {/* LEFT */}

    <div
      style={{
        flex: 1,
        padding: "80px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 2
      }}
    >

      <h1
  style={{
    fontSize: "64px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "15px"
  }}
>
  NEURONIX
</h1>

      <h2
  style={{
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "15px"
  }}
>
  Transforming Education Through Digital Excellence
</h2>

<p
  style={{
    maxWidth: "650px",
    lineHeight: "1.9",
    color: "#E5E7EB",
    fontSize: "16px"
  }}
>
  A comprehensive School ERP platform designed to
  streamline academic operations, automate administration,
  enhance communication, and provide real-time insights
  for District Administrators, Schools, Teachers,
  Students and Parents.
</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "15px",
          marginTop: "40px",
          maxWidth: "600px"
        }}
      >

        <div style={featureStyle}>
          🎓 Student Management
        </div>

        <div style={featureStyle}>
          👨‍🏫 Teacher Management
        </div>

        <div style={featureStyle}>
          📅 Attendance
        </div>

        <div style={featureStyle}>
          💰 Payroll
        </div>

        <div style={featureStyle}>
          🚌 Transport
        </div>

        <div style={featureStyle}>
          🏠 Hostel
        </div>

      </div>

      <div
        style={{
          marginTop: "40px",
          background:
            "rgba(255,255,255,0.12)",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.2)",
          borderRadius: "20px",
          padding: "25px",
          width: "500px"
        }}
      >

        <h3>
          📊 Dashboard
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",
            gap: "15px",
            marginTop: "15px"
          }}
        >

          <div>
            👨‍🎓 2500 Students
          </div>

          <div>
            👨‍🏫 180 Teachers
          </div>

          <div>
            🏫 12 Schools
          </div>

          <div>
            💰 ₹45L Collection
          </div>

        </div>

      </div>

    </div>

    {/* RIGHT LOGIN */}

    <div
      style={{
        width: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        zIndex: 2
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background:
            "rgba(255,255,255,0.15)",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.2)",
          borderRadius: "25px",
          padding: "40px",
          color: "#fff",
          boxShadow:
            "0 25px 50px rgba(0,0,0,0.25)"
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              fontSize: "60px"
            }}
          >
            🎓
          </div>

          <h2>
            Welcome Back
          </h2>

          <p>
            Login to continue
          </p>

        </div>

        <form
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            style={glassInput}
          />

         <div
  style={{
    position: "relative",
    marginBottom: "18px"
  }}
>

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
    required
    style={{
      width: "100%",
      padding: "14px",
      paddingRight: "50px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      boxSizing: "border-box"
    }}
  />

  <div
    onMouseDown={() =>
      setShowPassword(true)
    }
    onMouseUp={() =>
      setShowPassword(false)
    }
    onMouseLeave={() =>
      setShowPassword(false)
    }
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform:
        "translateY(-50%)",
      cursor: "pointer",
      color: "#374151"
    }}
  >
    {showPassword
      ? <FaEyeSlash />
      : <FaEye />}
  </div>

</div>

<div
  style={{
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "16px"
  }}
>

  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#fff"
    }}
  >
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={() =>
        setRememberMe(
          !rememberMe
        )
      }
    />

    Remember Me
  </label>

  <span
    style={{
      color: "#fff",
      cursor: "pointer",
      textDecoration:
        "underline"
    }}
    onClick={() =>
      navigate(
        "/forgot-password"
      )
    }
  >
    Forgot Password?
  </span>

</div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "#fff",
              color: "#2563EB",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Login
          </button>

        </form>

      </div>

    </div>
    <p
  onClick={() =>
    setShowForgotPassword(
      true
    )
  }
  style={{
    cursor: "pointer",
    color: "#2563EB",
    fontWeight: "600",
    fontSize: "15px"
  }}
>
  Forgot Password?
</p>

  </div>
);
}

// const inputStyle = {
//   width: "100%",
//   padding: "14px",
//   border: "1px solid #D1D5DB",
//   borderRadius: "12px",
//   marginBottom: "18px",
//   fontSize: "15px",
//   outline: "none",
//   boxSizing: "border-box"
// };

// const featureCard = {
//   background: "#FFFFFF",
//   padding: "18px",
//   borderRadius: "14px",
//   border: "1px solid #DBEAFE",
//   boxShadow:
//     "0 4px 12px rgba(37,99,235,0.08)",
//   fontWeight: "600",
//   color: "#374151"
// };

const glassInput = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  border:
    "1px solid rgba(255,255,255,0.3)",
  borderRadius: "12px",
  background:
    "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box"
};

const featureStyle = {
  background:
    "rgba(255,255,255,0.12)",
  padding: "15px",
  borderRadius: "12px",
  fontWeight: "600"
};

export default Login;