import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Timetable() {
  const [timetable,
    setTimetable] =
    useState([]);

  useEffect(() => {
    const getTimetable =
      async () => {
        try {
          const res =
            await API.get(
              "/timetable/all"
            );

          setTimetable(
            res.data
              .timetable
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    getTimetable();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Timetable
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Class
            </th>

            <th>
              Section
            </th>

            <th>Day</th>

            <th>
              Subject
            </th>

            <th>
              Teacher
            </th>

            <th>
              Start Time
            </th>

            <th>
              End Time
            </th>
          </tr>
        </thead>

        <tbody>
          {timetable.map(
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
                    item.className
                  }
                </td>

                <td>
                  {
                    item.section
                  }
                </td>

                <td>
                  {
                    item.day
                  }
                </td>

                <td>
                  {
                    item.subject
                  }
                </td>

                <td>
                  {
                    item
                      .teacherId
                      ?.name ||
                    "N/A"
                  }
                </td>

                <td>
                  {
                    item.startTime
                  }
                </td>

                <td>
                  {
                    item.endTime
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

export default Timetable;