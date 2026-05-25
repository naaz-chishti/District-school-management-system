import {
  useEffect,
  useState
} from "react";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Payroll() {
  const [payrolls,
    setPayrolls] =
    useState([]);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls =
    async () => {
      try {
        const response =
          await API.get(
            "/payroll/all"
          );

        console.log(
          response.data
        );

        setPayrolls(
          response.data
            .payrolls || []
        );
      } catch (
        error
      ) {
        console.log(
          "Payroll Error:",
          error
        );
      }
    };

  return (
    <DashboardLayout>
      <h1>
        Payroll
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>
              Teacher
            </th>

            <th>
              School
            </th>

            <th>
              Basic Salary
            </th>

            <th>
              Allowances
            </th>

            <th>
              Deductions
            </th>

            <th>
              Net Salary
            </th>

            <th>
              Month
            </th>

            <th>
              Year
            </th>

            <th>
              Payment Status
            </th>

            <th>
              Rating
            </th>

            <th>
              Remarks
            </th>
          </tr>
        </thead>

        <tbody>
          {payrolls.length >
          0 ? (
            payrolls.map(
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
                      .teacherId
                      ?.name ||
                      "N/A"}
                  </td>

                  <td>
                    {item
                      .schoolId
                      ?.schoolName ||
                      "N/A"}
                  </td>

                  <td>
                    {
                      item.basicSalary
                    }
                  </td>

                  <td>
                    {
                      item.allowances
                    }
                  </td>

                  <td>
                    {
                      item.deductions
                    }
                  </td>

                  <td>
                    {
                      item.netSalary
                    }
                  </td>

                  <td>
                    {
                      item.month
                    }
                  </td>

                  <td>
                    {
                      item.year
                    }
                  </td>

                  <td>
                    {
                      item.paymentStatus
                    }
                  </td>

                  <td>
                    {
                      item.performanceRating
                    }
                  </td>

                  <td>
                    {
                      item.remarks
                    }
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="11"
              >
                No payroll
                data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Payroll;