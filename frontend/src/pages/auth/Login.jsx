import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin =
    async (e) => {
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

        alert(
          "Login Success"
        );

        navigate(
          "/dashboard"
        );
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
        padding: "40px"
      }}
    >
      <h1>
        School Management Login
      </h1>

      <form
        onSubmit={
          handleLogin
        }
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;