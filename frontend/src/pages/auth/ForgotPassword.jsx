import { useState } from "react";
import API from "../../api/axios";

function ForgotPassword() {

  const [email,
    setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/auth/forgot-password",
          { email }
        );

        alert(
          "Password reset link sent to your email"
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );
      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "#f8fafc"
      }}
    >

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          width: "400px",
          background:
            "#fff",
          padding: "30px",
          borderRadius:
            "15px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >

        <h2>
          Forgot Password
        </h2>

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
            padding: "12px",
            marginTop: "15px",
            border:
              "1px solid #ddd",
            borderRadius:
              "8px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "20px",
            background:
              "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius:
              "8px",
            cursor: "pointer"
          }}
        >
          Send Reset Link
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;