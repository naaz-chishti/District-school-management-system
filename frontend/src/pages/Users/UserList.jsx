import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import TableHeader from "../../components/TableHeader";

function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users/all");

      const data = response.data.users || [];

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(value.toLowerCase()) ||
        user.email?.toLowerCase().includes(value.toLowerCase()) ||
        user.role?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/delete/${id}`);

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <TableHeader
        title="Users"
        count={filteredUsers.length}
        onSearch={handleSearch}
      />

      <button
        onClick={() => navigate("/users")}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        + Add User
      </button>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          overflowX: "auto"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f3f4f6"
              }}
            >
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>School</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.name}</td>

                <td style={tdStyle}>{user.email}</td>

                <td style={tdStyle}>{user.role}</td>

                <td style={tdStyle}>
                  {user.phone || "N/A"}
                </td>

                <td style={tdStyle}>
                  {user.schoolId?.schoolName || "N/A"}
                </td>

                <td
  style={{
    ...tdStyle,
    textAlign: "center",
    verticalAlign: "middle"
  }}
>
  <span
    style={{
      display: "inline-block",
      minWidth: "90px",
      background: user.isActive
        ? "#dcfce7"
        : "#fee2e2",
      color: user.isActive
        ? "#166534"
        : "#991b1b",
      padding: "6px 2px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      textAlign: "center"
    }}
  >
    {user.isActive
      ? "Active"
      : "Inactive"}
  </span>
</td>

               <td
  style={{
    ...tdStyle,
    textAlign: "center",
    verticalAlign: "middle"
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px"
    }}
  >
    <button
      onClick={() =>
        navigate(
          `/users?id=${user._id}`
        )
      }
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Edit
    </button>

    <button
      onClick={() =>
        deleteUser(user._id)
      }
      style={{
        background: "#dc2626",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Delete
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd"
};

const tdStyle = {
  padding: "16px 12px",
  borderBottom: "1px solid #eee",
  verticalAlign: "middle"
};

export default UserList;