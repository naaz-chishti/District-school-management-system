import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Hostel() {
  const [hostels,
    setHostels] =
    useState([]);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels =
    async () => {
      try {
        const response =
          await API.get(
            "/hostel/all"
          );

        console.log(
          response.data
        );

        setHostels(
          response.data
            .hostels || []
        );
      } catch (
        error
      ) {
        console.log(
          "Hostel Error:",
          error
        );
      }
    };

  return (
    <DashboardLayout>
      <h1>
        Hostel
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Hostel Name
            </th>

            <th>
              Room Number
            </th>

            <th>
              Room Type
            </th>

            <th>
              Capacity
            </th>

            <th>
              Occupied Beds
            </th>

            <th>
              Warden Name
            </th>

            <th>
              Warden Phone
            </th>

            <th>
              Hostel Fee
            </th>

            <th>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {hostels.length >
          0 ? (
            hostels.map(
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
                      item.hostelName
                    }
                  </td>

                  <td>
                    {
                      item.roomNumber
                    }
                  </td>

                  <td>
                    {
                      item.roomType
                    }
                  </td>

                  <td>
                    {
                      item.capacity
                    }
                  </td>

                  <td>
                    {
                      item.occupiedBeds
                    }
                  </td>

                  <td>
                    {
                      item.wardenName
                    }
                  </td>

                  <td>
                    {
                      item.wardenPhone
                    }
                  </td>

                  <td>
                    {
                      item.hostelFee
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
                colSpan="9"
              >
                No hostel
                data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Hostel;