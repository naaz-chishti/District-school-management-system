import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function AuditLog() {
  const [logs,
    setLogs] =
    useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs =
    async () => {
      try {
        const response =
          await API.get(
            "/audit/all"
          );

        console.log(
          response.data
        );

        setLogs(
          response.data
            .logs || []
        );
      } catch (
        error
      ) {
        console.log(
          "Audit Error:",
          error
        );
      }
    };

  return (
    <DashboardLayout>
      <h1>
        Audit Logs
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              User Name
            </th>

            <th>
              Role
            </th>

            <th>
              Action
            </th>

            <th>
              Module
            </th>

            <th>
              Details
            </th>

            <th>
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {logs.length >
          0 ? (
            logs.map(
              (
                item
              ) => (
                <tr
                  key={
                    item._id
                  }
                >
                  <td>
                    {item
                      .userId
                      ?.name ||
                      "N/A"}
                  </td>

                  <td>
                    {item
                      .userId
                      ?.role ||
                      "N/A"}
                  </td>

                  <td>
                    {
                      item.action
                    }
                  </td>

                  <td>
                    {
                      item.module
                    }
                  </td>

                  <td>
                    {
                      item.details
                    }
                  </td>

                  <td>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="6"
              >
                No audit
                logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default AuditLog;