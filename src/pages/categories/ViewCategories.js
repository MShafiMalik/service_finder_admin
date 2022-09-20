import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../../common/constants";
import Datatable from "../../components/datatable";
import {
  fetchDataWithBody,
  fetchDataWithoutBody,
} from "../../helpers/FetchApi";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    const url = `${SERVER_BASE_URL}api/category/all`;
    fetchDataWithoutBody(url, "GET").then((response) => {
      if (response.success === true) {
        const new_data = response.data.map((data, i) => {
          return {
            ...data,
            sr_no: i + 1,
            image: (
              <img
                src={data.image}
                alt="category"
                style={{ width: "80px", padding: "8px 0" }}
              />
            ),
          };
        });
        setCategories(new_data);
      }
    });
  };

  const columns = [
    {
      name: <b>Sr No</b>,
      selector: (row) => row.sr_no,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      name: <b>Image</b>,
      selector: (row) => row.image,
      reorder: true,
      right: true,
    },
    {
      name: <b>Action</b>,
      button: true,
      cell: (row) => (
        <Link to={`/category/edit/${row._id}`}>
          <IconButton color="primary">
            <Edit />
          </IconButton>
        </Link>
      ),
    },
  ];

  const deleteAll = (data) => {
    const category_ids = data.map((dataItem) => {
      return dataItem._id;
    });
    const url = `${SERVER_BASE_URL}api/category/delete`;
    return fetchDataWithBody(url, { category_ids }).then((response) => {
      if (response.success === true) {
        toast.success(response.message, {
          autoClose: 2000,
        });
        getAllCategories();
        return true;
      } else {
        toast.error(response.message, {
          autoClose: 2000,
        });
        return false;
      }
    });
  };

  return (
    <Datatable
      columns={columns}
      rows={categories}
      addBtnUrl="/category/add"
      delFunction={deleteAll}
    />
  );
};

export default ViewCategories;
