import React, { useEffect, useState } from "react";
import "./edit.css";
import avatar from "../../../assets/image/profil-avatar.png";
import Profile from "./Profile";
import userProfile from "../../../assets/image/user-profil.png";
import mappin from "../../../assets/image/map-pin.png";
import copy from "../../../assets/image/clipboard.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updateUser } from "../../../configs/redux/actions/userAction";
import axios from "axios";

const EditProfil = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const data = new FormData();
    data.append("fullname", fullname);
    data.append("email", email);
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND}/user/updateProfile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(updateUser(res));
        navigate("/profil");
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate users",
          text: `username : ${fullname}`,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data yang anda inputkan salah",
        });
        console.log(err);
      });
  };
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
    setFullname(response.data.data.fullname);
    setEmail(response.data.data.email);
  };
  return (
    <div className="my-bag">
      <div className="row">
        <Profile
          titleOne="My Account"
          titleTwo="Shipping Adrress"
          titleThere="My order"
          imgOne={userProfile}
          imgTwo={mappin}
          imgTheree={copy}
        />

        <div className="col-lg-7 profil-form">
          <div className="card mt-3">
            <div className="card-body">
              <h3 className="title-profil">My Profile</h3>
              <p className="sub-profil text-secondary">
                Manage your profile information
              </p>
              <hr />
              <form action="" onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-sm-9">
                    <div className="mb-3 mt-1 row">
                      <label
                        htmlFor="fullname"
                        className="col-sm-3 col-form-label text-end text-form"
                      >
                        Name
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-4 row">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label text-end text-form"
                      >
                        Email
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="col-sm-9">
                        <button type="submit" className="btn btn-submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3 image-profil text-center">
                    <img src={avatar} className="rounded-circle" alt="" />
                    <div className="select-avatar mt-3">
                      <button className="btn btn-select-profil">
                        Select image
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfil;
