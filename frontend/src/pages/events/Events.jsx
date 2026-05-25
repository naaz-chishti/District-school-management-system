import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Events() {
  const [events,
    setEvents] =
    useState([]);

  useEffect(() => {
    const getEvents =
      async () => {
        try {
          const res =
            await API.get(
              "/events/all"
            );

          setEvents(
            res.data.events
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    getEvents();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Events
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
              Description
            </th>

            <th>
              Type
            </th>

            <th>
              Start Date
            </th>

            <th>
              End Date
            </th>

            <th>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {events.map(
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
                    item.description
                  }
                </td>

                <td>
                  {
                    item.eventType
                  }
                </td>

                <td>
                  {new Date(
                    item.startDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {new Date(
                    item.endDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {
                    item.status
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Events;