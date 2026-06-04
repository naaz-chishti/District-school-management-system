import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  console.log("TOKEN:", localStorage.getItem("token"));
console.log("USER:", localStorage.getItem("user"));

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role check (safe)
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;