import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import Swal from "sweetalert2";

const DataTablePage = ({ columns, rows, addBtnUrl, delFunction }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  const actions = (
    <Link to={addBtnUrl}>
      <IconButton color="primary">
        <Add />
      </IconButton>
    </Link>
  );

  const contextActions = (deleteHandler) => (
    <IconButton color="secondary" onClick={deleteHandler}>
      {loading ? <CircularProgress color="secondary" /> : <Delete />}
    </IconButton>
  );

  const deleteAll = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const response = await delFunction(selectedData);
        if (response) {
          setLoading(false);
          setToggleCleared(!toggleCleared);
        } else {
          setLoading(false);
        }
      }
    });
  };

  return (
    <DataTable
      title={<h3>Categories</h3>}
      columns={columns}
      data={rows}
      defaultSortFieldId={1}
      sortIcon={<SortIcon className="ms-1" />}
      pagination
      highlightOnHover
      selectableRows
      actions={actions}
      contextActions={contextActions(deleteAll)}
      selectableRowsComponent={Checkbox}
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={handleChange}
    />
  );
};

export default DataTablePage;
