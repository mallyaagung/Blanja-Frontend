import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const getProduct =
  ({ page, limit, search, sort }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const navigate = useNavigate();
      dispatch({ type: ActionTypes.GET_PRODUCT_PENDING });
      const { data } = await axios(
        {
          url: `/product/filter?page=${page}&limit=${limit}${
            search ? "&search=" + search : ""
          }${sort ? "&sort=" + sort : ""}`,
          method: "GET",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: ActionTypes.GET_PRODUCT_SUCCESS,
        payload: { data: data.data, pagination: data.pagination },
      });
      navigate("/productList");
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_PRODUCT_ERROR,
        payload: error.response,
      });
    }
  };

export const setDataProduct = (page, type) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .get(`${process.env.REACT_APP_BACKEND}/product?page=${page}&type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      const response = result.data.data;
      console.log(response);
      dispatch({ type: ActionTypes.SET_PRODUCTS, payload: response });
      const pagination = result.data.pagination;
      dispatch({ type: ActionTypes.UPDATE_PAGE, payload: pagination });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const updateProduct =
  (data, id, saveImage, setShow) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("productname", data.productname);
      formData.append("storename", data.storename);
      formData.append("sizeproduct", data.sizeproduct);
      formData.append("colorproduct", data.colorproduct);
      formData.append("priceproduct", data.priceproduct);
      formData.append("stockproduct", data.stockproduct);
      formData.append("ratingproduct", data.ratingproduct);
      formData.append("id_category", data.id_category);
      formData.append("id_seller", data.id_seller);
      formData.append("description", data.description);
      formData.append("photo", saveImage);
      const products = await axios.put(
        process.env.REACT_APP_BACKEND + "/product/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(products);
      alert("update product successful");
      setShow(false);
      const result = products.data.data;
      dispatch({ type: "UPDATE_PRODUCT", payload: result });
    } catch (err) {
      console.error(err.message);
      alert("update product failed");
      setShow(false);
    }
  };

export const getDetail = (id) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_PENDING" });
  const data = await axios
    .get(`${process.env.REACT_APP_BACKEND}/product/${id}`)
    .catch((err) => {
      console.log(err);
    });
  console.log(data);

  dispatch({ type: ActionTypes.SELECTED_PRODUCT, payload: data });
};

export const createProduct = (data, saveImage, setShow) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("productname", data.productname);
    formData.append("storename", data.storename);
    formData.append("sizeproduct", data.sizeproduct);
    formData.append("colorproduct", data.colorproduct);
    formData.append("priceproduct", data.priceproduct);
    formData.append("stockproduct", data.stockproduct);
    formData.append("ratingproduct", data.ratingproduct);
    formData.append("id_category", data.id_category);
    formData.append("id_seller", data.id_seller);
    formData.append("description", data.description);
    formData.append("photo", saveImage);
    const products = await axios.post(
      process.env.REACT_APP_BACKEND + "/product",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(products);
    alert("create product successful");
    setShow(false);
    window.location.reload(false);
    const result = products.data.data;
    dispatch({ type: ActionTypes.CREATE_PRODUCTS, payload: result });
  } catch (err) {
    console.error(err.message);
    alert("create product failed");
    setShow(false);
  }
};

export const deleteProduct = (product) => {
  return {
    type: ActionTypes.DELETE_PRODUCTS,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};
