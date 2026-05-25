import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Users() {
  const [users,
    setUsers] =
    useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {
      try {
        const response =
          await API.get(
            "/users/all"
          );

        console.log(
          response.data
        );

        setUsers(
          response.data
            .users || []
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  return (
    <DashboardLayout>
      <h1>
        Users
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Name
            </th>

            <th>
              Email
            </th>

            <th>
              Role
            </th>

            <th>
              Phone
            </th>

            <th>
              School
            </th>

            <th>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length >
          0 ? (
            users.map(
              (
                user
              ) => (
                <tr
                  key={
                    user._id
                  }
                >
                  <td>
                    {
                      user.name
                    }
                  </td>

                  <td>
                    {
                      user.email
                    }
                  </td>

                  <td>
                    {
                      user.role
                    }
                  </td>

                  <td>
                    {user.phone ||
                      "N/A"}
                  </td>

                  <td>
                    {user
                      .schoolId
                      ?.schoolName ||
                      "N/A"}
                  </td>

                  <td>
                    {user.isActive
                      ? "Active"
                      : "Inactive"}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="6"
              >
                No users
                found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Users;