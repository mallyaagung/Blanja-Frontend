import React, { useEffect, useState } from "react";
import Navbar from "../components/module/home/Navbar/Navbar";
import Category from "../components/module/home/Category/Category";

import "./pagesHome.css";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import slide1 from "../assets/image/carousel-trend.png";
import slide2 from "../assets/image/carousel-black.png";
import Product from "../assets/image/baju.png"

import Populer from "../components/module/home/Popular/Popular";
import Footer from "../components/module/home/Footer/Footer";
import axios from "axios";
import Card from "../components/base/Card";

import { FormatRupiah } from "@arismun/format-rupiah";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../configs/redux/actions/productsActions";

const Home = () => {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const token = localStorage.getItem("token")
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(response);
    dispatch(setProducts(response.data.data));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <Navbar />
      {/* Carousel Start*/}
      <div className="container mt-5">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={30}
          autoWidth={false}
          items={1}
          autoplayTimeout={2000}
          autoplay={true}
        >
          <div class="item mt-5">
            <img src={slide1} className="slide-size" />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <h2 className="caption">Trends in 2020</h2>
            </div>
          </div>
          <div class="item mt-5">
            <img src={slide2} className="slide-size" />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <h2 className="caption">Black Edition</h2>
            </div>
          </div>
        </OwlCarousel>
      </div>
      {/* Carousel End */}
      <Category />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p>What are you currently looking for</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
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
      <Populer />
      <Footer />
    </div>
  );
};

export default Home;
