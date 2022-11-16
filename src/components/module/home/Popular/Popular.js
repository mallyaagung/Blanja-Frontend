import React, { useEffect, useState } from "react";
import "../StyleHome.css";
// import product from "../../../../assets/image/product.png";
import axios from "axios";
import Card from "../../../base/Card";
import { useDispatch, useSelector } from "react-redux";
import { FormatRupiah } from "@arismun/format-rupiah";
import { setProducts } from "../../../../configs/redux/actions/productsActions";
import Product from "../../../../assets/image/baju.png";

function Populer() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="products mt-5 mb-2 title">Populer</h3>
            <p>Find clothes that are trending recently</p>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <Card
                  src={Product}
                  to={`/detail/${item.id}`}
                  titleName={item.productname}
                  price={<FormatRupiah value={item.priceproduct} />}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Populer;
