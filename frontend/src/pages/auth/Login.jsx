import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const isMobile =
    window.innerWidth < 768;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

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

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.openai.com/static-rsc-4/FQPCk2ONbJet3efM_JeJ6MOIZWTRNGcHvb4I_ByDPcrBJkQ-klOzv_hjsqwzG_ChrGGUyPR6hp4MOy22_8Z9s-NsI1pl1iKL1c6caajltT8SkWN0PVP7m-LnHXO1u3U2_7GEsWWWF3CXDblIupIdp96kWGZ9MYB5z3uvszIyYP0?purpose=inline')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "rgba(0,0,0,0.45)",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: isMobile
            ? "95%"
            : "450px",
          background:
            "rgba(255,255,255,0.15)",
          backdropFilter:
            "blur(15px)",
          WebkitBackdropFilter:
            "blur(15px)",
          border:
            "1px solid rgba(255,255,255,0.2)",
          borderRadius: "20px",
          padding: isMobile
            ? "25px"
            : "40px",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: isMobile
              ? "40px"
              : "50px",
            marginBottom: "10px",
          }}
        >
          🎓
        </div>

        <h1
          style={{
            marginBottom: "10px",
            fontSize: isMobile
              ? "22px"
              : "30px",
            fontWeight: "700",
          }}
        >
          NEURONIX
          TECHNOLOGIES
        </h1>

        <h3
          style={{
            marginBottom: "8px",
            fontSize: isMobile
              ? "16px"
              : "20px",
          }}
        >
          District School
          Management System
        </h3>

        <p
          style={{
            marginBottom: "30px",
            color: "#e5e7eb",
            fontSize: isMobile
              ? "13px"
              : "15px",
          }}
        >
          Empowering Education
          Through Technology
        </p>

        <form
          onSubmit={
            handleLogin
          }
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              boxSizing:
                "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
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
              marginBottom: "20px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              boxSizing:
                "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: isMobile
                ? "12px"
                : "14px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(90deg,#2563eb,#06b6d4)",
              color: "#fff",
              fontSize: isMobile
                ? "14px"
                : "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            fontSize: "12px",
            color: "#e5e7eb",
          }}
        >
          © 2026 Neuronix
          Technologies.
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;