import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Notifications() {
  const [
    notifications,
    setNotifications
  ] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const response =
          await API.get(
            "/notifications/all"
          );

        console.log(
          response.data
        );

        setNotifications(
          response.data
            .notifications || []
        );
      } catch (
        error
      ) {
        console.log(
          "Notification Error:",
          error
        );
      }
    };

  return (
    <DashboardLayout>
      <h1>
        Notifications
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Title
            </th>

            <th>
              Message
            </th>

            <th>
              Sent To
            </th>

            <th>
              School
            </th>

            <th>
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {notifications.length >
          0 ? (
            notifications.map(
              (
                item
              ) => (
                <tr
                  key={
                    item._id
                  }
                >
                  <td>
                    {
                      item.title
                    }
                  </td>

                  <td>
                    {
                      item.message
                    }
                  </td>

                  <td>
                    {
                      item.sentTo
                    }
                  </td>

                  <td>
                    {item
                      .schoolId
                      ?.schoolName ||
                      "N/A"}
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
                colSpan="5"
              >
                No
                notifications
                found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Notifications;