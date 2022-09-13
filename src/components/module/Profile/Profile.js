import React, { useEffect, useState } from "react";
import "./profile.css";
import profile from "../../../assets/image/profileBig.png";
import home from "../../../assets/image/seling-product/home.png";
import vector from "../../../assets/image/seling-product/vector_2.png";
import avatar from "../../../assets/image/edit-avatar.png";
import packages from "../../../assets/image/seling-product/package.png";
import cart from "../../../assets/image/seling-product/shopping-cart.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = ({
  titleOne,
  titleTwo,
  titleThere,
  imgOne,
  imgTwo,
  imgTheree,
  children,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [date_of_brith, setDate_of_brith] = useState("");
  useEffect(() => {
    datas();
  }, []);

  const datas = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.fullname);
    setDate_of_brith(response.data.data[0].date_of_brith);
  };
  console.log(user);
  return (
    <div className="col-md-4 mt-2 select-profil">
      <div className="profil-avatar ">
        <table>
          <tbody>
            <td className=" align-middle float-start image">
              <img
                className="rounded-circle"
                width={75}
                height={70}
                src={date_of_brith ? date_of_brith : profile}
                alt="img"
              />
            </td>
            <td className="align-middle float-start ms-3 image-text">
              <p className="post mb-2">{user.fullname}</p>
              <p className=" edit-profil mt-2">
                <img src={avatar} className="me-2" alt="" />
                ubah profil
              </p>
            </td>
          </tbody>
        </table>
      </div>
      <div className="profil-select mt-0">
        <ul className="list-unstyled ps-0 mt-2">
          <li className="mb-1">
            <div className="collapse show" id="home-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small"></ul>
            </div>
          </li>
          <li className="mb-1 mt-3">
            <button className="btn btn-location">
              <img src={imgTwo} alt="" />
            </button>
            <Link to="/productList">
              <button
                className="btn btn-toggle title-dashboard d-inline-flex align-items-center rounded border-0 collapsed text-secondary"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="true"
              >
                <span className="text-profil">My Products</span>
              </button>
            </Link>
            <img src={vector} className="img-down ms-4" alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  titleOne: "Store",
  titleTwo: "Products",
  titleThere: "Orders",
  imgOne: home,
  imgTwo: packages,
  imgTheree: cart,
};
export default Profile;
