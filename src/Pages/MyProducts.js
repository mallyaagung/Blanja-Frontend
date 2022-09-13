import axios from "axios";
import Card from "../components/base/Card";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../components/base/Footer/Footer";
import Navbar from "../components/module/home/Navbar/Navbar";

const MyProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);

  const handleSort = (e) => {
    setSort(e.currentTarget.value);
  };
  console.log(search);

  const handleSearch = (e) => {
    e.preventDefault();
    getProducts();
    setSearchParams({
      search,
      sort,
    });
  };

  const getProducts = async () => {
    const cari =
      searchParams.get("search") === null ? "" : searchParams.get("search");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/product?search=${cari}&sort=${sort}`
      )
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProducts();
    setSearch(searchParams.get("search"));
    searchParams.get("search");
    searchParams.get("sort");
  }, [searchParams]);
  // console.log(searchParams.get("sort"));

  return (
    <div className="h-100">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p className="mt-5">My Products List</p>
          </div>

          {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
        </div> */}
          <form onSubmit={handleSearch}>
            <select onChange={handleSort}>
              <option value="">Pilih Option</option>
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </select>
            <button type="submit">Sort</button>
          </form>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.length > 0 ? (
              products.map((item) => (
                <div className="col" key={item.id}>
                  <Card
                    src={item.photo}
                    to={`/detail/${item.id}`}
                    titleName={item.productname}
                    price={item.priceproduct}
                  />
                </div>
              ))
            ) : (
              <div className=" text-center m-auto mb-5">
                <h2>Product Not Found :(</h2>
                <Footer />
              </div>
            )}
          </div>
          {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5 justify-content-evenly">
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
