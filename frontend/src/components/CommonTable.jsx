import { DataGrid } from "@mui/x-data-grid";

function CommonTable({
  rows,
  columns
}) {
  return (
    <div
      style={{
        height: 500,
        width: "100%",
        background: "#fff",
        borderRadius: "12px",
        padding: "10px"
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default CommonTable;