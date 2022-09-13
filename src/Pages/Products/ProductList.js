import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import "../../components/module/Profile/profile.css";
import "../../components/module/Profile/responsive-profile.css";
import Profile from "../../components/module/Profile/Profile";
import Footer from "../../components/module/home/Footer/Footer";
import Navbar from "../../components/module/home/Navbar/Navbar";
import CreateModalProduct from "../../components/module/ActionProduct/CreateModalProduct";
import EditModalProduct from "../../components/module/ActionProduct/EditModalProduct";

const ProductList = () => {
  const [products, getProducts] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const gettingData = await axios.get(
        `${process.env.REACT_APP_BACKEND}/product?sortby=id&search=&sort=asc&page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProducts(gettingData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.REACT_APP_BACKEND}/product/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your message has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Your message has not been deleted.", "error");
          });
      }
    });
  };

  return (
    <Fragment>
      <div className="my-bag">
        <Navbar />
        <div className="row row-cols-lg-2">
          <Profile>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 ms-5 small ">
              <li>
                <Link
                  to="/productlist"
                  className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-2"
                >
                  My Products
                </Link>
              </li>
              <li>
                <Link
                  to="/selling"
                  className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-3 text-secondary"
                >
                  Add Product
                </Link>
              </li>
            </ul>
          </Profile>
          <div className="col-md-7 profil-form">
            <div className="card mt-3">
              <div className="card-body">
                <h4 className="mb-3">My Products</h4>
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 bd-highlight text-success">All Items</div>
                  <div className="p-2 bd-highlight text-success">Sould Out</div>
                  <div className="p-2 bd-highlight text-success">Archived</div>
                  <hr />
                </div>
                <div className="input-group rounded list-search w-50 mt-3">
                  <input
                    type="search"
                    className="form-control search-input"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    name="search"
                  />
                  <span
                    className="input-group-text search bg-light"
                    id="search-addon"
                  >
                    <i className="bi bi-search"></i>
                  </span>
                </div>

                <CreateModalProduct>Create</CreateModalProduct>

                <div className="table-responsive mt-4">
                  <table className="table">
                    <thead className="table-light text-center">
                      <tr>
                        <th>PRODUCT NAME</th>
                        <th>STOCK</th>
                        <th>PRICE</th>
                        <th>PHOTO</th>
                        <th>DESCRIPTION</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {products.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productname}</td>
                          <td>{item.stockproduct}</td>
                          <td>{item.priceproduct}</td>
                          <td>
                            <img
                              src={item.photo}
                              alt=""
                              width={50}
                              height={55}
                            />
                          </td>
                          <td>{item.description}</td>
                          <td>
                            <EditModalProduct
                              id={item.id}
                              productname={item.productname}
                              storename={item.storename}
                              sizeproduct={item.sizeproduct}
                              colorproduct={item.colorproduct}
                              priceproduct={item.priceproduct}
                              stockproduct={item.stockproduct}
                              ratingproduct={item.ratingproduct}
                              id_category={item.id_category}
                              id_seller={item.id_seller}
                              photo={item.photo}
                              description={item.description}
                            >
                              Edit
                            </EditModalProduct>
                            <button
                              onClick={() => deleteCategory(item.id)}
                              className="btn btn-danger mt-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ProductList;
