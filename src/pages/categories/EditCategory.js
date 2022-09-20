import { SERVER_BASE_URL } from "../../common/constants";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { fetchApiCloudinary, fetchDataWithBody } from "../../helpers/FetchApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../common/routes";

const EditCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const body = { category_id: id };
    const url = `${SERVER_BASE_URL}api/category/get-one`;
    fetchDataWithBody(url, body).then((response) => {
      if (response.success === true) {
        let defaultValues = {};
        defaultValues.category = response.data.name;
        setImage(response.data.image);
        reset({ ...defaultValues });
      }
    });
  }, [id, reset]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((data) => setImage(data));
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.image[0];

    let body;
    if (image) {
      const img_url = await fetchApiCloudinary(image, "categories");
      body = {
        category_id: id,
        name: data.category,
        image: img_url,
      };
    } else {
      body = {
        category_id: id,
        name: data.category,
      };
    }

    const url = `${SERVER_BASE_URL}api/category/update`;
    const response = await fetchDataWithBody(url, body);
    if (response.success === true) {
      setLoading(false);
      toast.success(response.message, {
        autoClose: 2000,
      });
      navigate(ROUTES.CATEGORY.BASE);
    } else {
      setLoading(false);
      toast.error(response.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <h4>Edit Category</h4>
      <form className="row mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6 form-group">
          <label>
            Category Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Category Name"
            {...register("category", { required: true })}
          />
          {errors.category ? (
            <p className="validation-error">Category is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-group">
          <label>
            Image <span className="text-danger">*</span>
          </label>
          <input
            className="form-control mt-2"
            type="file"
            accept=".jpg, .png"
            {...register("image", {
              required: false,
              onChange: handleImageUpload,
            })}
          />
          {errors.image ? (
            <p className="validation-error">Image is required</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-12 my-3">
          {image ? <img src={image} alt="Category" width="100%" /> : ""}
        </div>
        <div className="col-sm-12 d-flex justify-content-end">
          <Link
            to={ROUTES.CATEGORY.BASE}
            className="btn me-1 mb-1 theme-btn-outline"
          >
            Back
          </Link>
          {loading === true ? (
            <button
              type="submit"
              className="btn btn-primary me-1 mb-1 theme-btn"
              disabled="disabled"
            >
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary me-1 mb-1 theme-btn"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default EditCategory;
