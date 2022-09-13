import React from "react";
import Swal from "sweetalert2";
import Home from "../../Pages/Home";
import Profil from "../../Pages/Profil";
import PageBag from "../../Pages/PageBag";
import Login from "../../Pages/auth/Login";
import { useSelector } from "react-redux";
import Checkout from "../../Pages/Checkout";
import Detail from "../../Pages/DetailProduct";
import MyProducts from "../../Pages/MyProducts";
import Register from "../../Pages/auth/Register";
import Page404 from "../../Pages/Page404/Page404";
import ProductList from "../../Pages/Products/ProductList";
import RequireAuth from "../../components/base/RequireAuth";
import RegisterSeller from "../../Pages/auth/RegisterSeller";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Role = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user.roles !== "seller") {
    Swal.fire("Access Denied.", "question");
    return <Navigate to="/profil" replace />;
  }
  return children;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace="true" />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerSeller" element={<RegisterSeller />} />
        <Route path="/myProducts" element={<MyProducts />} />
        <Route
          path="/productList"
          element={
            <RequireAuth>
              <Role>
                <ProductList />
              </Role>
            </RequireAuth>
          }
        />
        <Route
          path="/Bag"
          element={
            <RequireAuth>
              <PageBag />
            </RequireAuth>
          }
        />
        <Route
          path="/Checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/profil"
          element={
            <RequireAuth>
              <Profil />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
