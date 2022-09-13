import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../configs/redux/actions/productsActions";

const ModalCreate = ({ children }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saveImage, setSaveImage] = useState(null);
  function handleUpload(e) {
    console.log(e.target.files[0]);
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }
  const [data, setData] = useState({
    id: "",
    productname: "",
    storename: "",
    sizeproduct: "",
    colorproduct: "",
    priceproduct: "",
    stockproduct: "",
    ratingproduct: "",
    id_category: "",
    id_seller: "",
    description: "",
    photo: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(data, saveImage, setShow));
  };

  return (
    <Fragment>
      <button
        className="btn btn-success mt-3"
        style={{ marginRight: "10px" }}
        onClick={handleShow}
      >
        {children}
      </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              className="form-control mt-3"
              type="text"
              placeholder="ID Product"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Product Name"
              name="productname"
              value={data.productname}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Store"
              name="storename"
              value={data.storename}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Size"
              name="sizeproduct"
              value={data.sizeproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Color"
              name="colorproduct"
              value={data.colorproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Price"
              name="priceproduct"
              value={data.priceproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Stock"
              name="stockproduct"
              value={data.stockproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Rating"
              name="ratingproduct"
              value={data.ratingproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Id Category"
              name="id_category"
              value={data.id_category}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Id Seller"
              name="id_seller"
              value={data.id_seller}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="description"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="file"
              placeholder="Photo"
              name="photo"
              onChange={handleUpload}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" id="button-addon2" title="Register">
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default ModalCreate;
