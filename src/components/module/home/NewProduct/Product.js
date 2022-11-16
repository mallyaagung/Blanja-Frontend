import React, { useEffect } from "react";
import "../StyleHome.css";
import axios from "axios";
import Card from "../../../base/Card";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../configs/redux/actions/productsActions";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link } from "react-router-dom";
import Products from "../../../../assets/image/baju.png";

const Product = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND}/product?sortby=id&search=&sort=asc&page=1&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
    dispatch(setProducts(response.data.data));
    // console.log(JSON.stringify(response.data));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p>What are you currently looking for</p>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <Card
                  src={Products}
                  to={<Link to={`/detail/${item.id}`}></Link>}
                  titleName={item.productname}
                  price={<FormatRupiah value={item.priceproduct} />}
                  brand={item.storename}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
