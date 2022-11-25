import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../configs/redux/actions/productsActions";

const ModalEdit = ({
  children,
  id,
  productname,
  storename,
  sizeproduct,
  colorproduct,
  priceproduct,
  stockproduct,
  ratingproduct,
  id_category,
  id_seller,
  description,
  photo,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saveImage, setSaveImage] = useState(photo);
  function handleUpload(e) {
    console.log(e.target.files[0]);
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }
  const [data, setData] = useState({
    productname,
    storename,
    sizeproduct,
    colorproduct,
    priceproduct,
    stockproduct,
    ratingproduct,
    id_category,
    id_seller,
    description,
    photo,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(data, id, saveImage, setShow));
  };

  return (
    <Fragment>
      <button
        className="btn btn-dark text-light"
        style={{ marginRight: "10px" }}
        onClick={handleShow}
      >
        {children}
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Product Name"
              id={id}
              name="productname"
              value={data.productname}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Store"
              id={id}
              name="storename"
              value={data.storename}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Size"
              id={id}
              name="sizeproduct"
              value={data.sizeproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Color"
              id={id}
              name="colorproduct"
              value={data.colorproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Price"
              id={id}
              name="priceproduct"
              value={data.priceproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Stock"
              id={id}
              name="stockproduct"
              value={data.stockproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Rating"
              id={id}
              name="ratingproduct"
              value={data.ratingproduct}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Id Category"
              id={id}
              name="id_category"
              value={data.id_category}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Id Seller"
              id={id}
              name="id_seller"
              value={data.id_seller}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="description"
              id={id}
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <input
              className="form-control mt-3"
              type="file"
              placeholder="Photo"
              id={id}
              name="photo"
              onChange={handleUpload}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" id="button-addon2" title="Register">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default ModalEdit;
