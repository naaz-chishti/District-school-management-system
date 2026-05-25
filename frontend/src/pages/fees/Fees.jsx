import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Fees() {
  const [fees,
    setFees] =
    useState([]);

  const getFees =
    async () => {
      try {
        const res =
          await API.get(
            "/fees/all"
          );

        setFees(
          res.data.fees
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getFees();
  }, []);

  return (
    <DashboardLayout>
      <h1>
        Fees
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Student Name
            </th>

            <th>
              Total Fee
            </th>

            <th>
              Paid Amount
            </th>

            <th>
              Remaining
            </th>

            <th>Status</th>

            <th>
              Payment Method
            </th>
          </tr>
        </thead>

        <tbody>
          {fees.map(
            (fee) => (
              <tr
                key={
                  fee._id
                }
              >
                <td>
                  {
                    fee
                      .studentId
                      ?.name
                  }
                </td>

                <td>
                  ₹
                  {
                    fee.totalFee
                  }
                </td>

                <td>
                  ₹
                  {
                    fee.paidAmount
                  }
                </td>

                <td>
                  ₹
                  {
                    fee.remainingAmount
                  }
                </td>

                <td>
                  {
                    fee.paymentStatus
                  }
                </td>

                <td>
                  {
                    fee.paymentMethod
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

export default Fees;