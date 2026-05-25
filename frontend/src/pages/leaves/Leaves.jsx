import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Leaves() {
  const [leaves,
    setleaves] =
    useState([]);

  useEffect(() => {
    const getleaves =
      async () => {
        try {
          const res =
            await API.get(
              "/leaves/all"
            );

          setleaves(
            res.data.leaves
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    getleaves();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Leaves
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Leave Type
            </th>

            <th>
              Reason
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
          {leaves.map(
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
                    item.leaveType
                  }
                </td>

                <td>
                  {
                    item.reason
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

export default Leaves;