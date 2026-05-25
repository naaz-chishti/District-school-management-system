import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Transport() {

  const [
    transport,
    setTransport
  ] = useState([]);

  const getTransport =
    async () => {
      try {

        const res =
          await API.get(
            "/transports/all"
          );

        setTransport(
          res.data
            .transport || []
        );

      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    getTransport();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Transport
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Bus Number
            </th>

            <th>
              Vehicle Number
            </th>

            <th>
              Driver Name
            </th>

            <th>
              Driver Phone
            </th>

            <th>
              Route
            </th>

            <th>
              Capacity
            </th>

            <th>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {transport &&
          transport.length >
            0 ? (
            transport.map(
              (item) => (
                <tr
                  key={
                    item._id
                  }
                >
                  <td>
                    {
                      item.busNumber
                    }
                  </td>

                  <td>
                    {
                      item.vehicleNumber
                    }
                  </td>

                  <td>
                    {
                      item.driverName
                    }
                  </td>

                  <td>
                    {
                      item.driverPhone
                    }
                  </td>

                  <td>
                    {
                      item.routeName
                    }
                  </td>

                  <td>
                    {
                      item.capacity
                    }
                  </td>

                  <td>
                    {
                      item.status
                    }
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="7"
              >
                No Transport Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Transport;