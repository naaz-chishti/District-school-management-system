import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Messages() {
  const [messages,
    setMessages] =
    useState([]);

  useEffect(() => {
    fetchInbox();
  }, []);

  const fetchInbox =
    async () => {
      try {
        const response =
          await API.get(
            "/messages/inbox"
          );

        console.log(
          response.data
        );

        setMessages(
          response.data
            .inbox || []
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
        Messages
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Sender
            </th>

            <th>
              Title
            </th>

            <th>
              Message
            </th>

            <th>
              Type
            </th>

            <th>
              Read
            </th>

            <th>
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {messages.length >
          0 ? (
            messages.map(
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
                      .senderId
                      ?.name ||
                      "N/A"}
                  </td>

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
                      item.messageType
                    }
                  </td>

                  <td>
                    {item.isRead
                      ? "Yes"
                      : "No"}
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
                No messages
                found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Messages;