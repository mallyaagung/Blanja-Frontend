import axios from "axios";
import swal from "sweetalert2";
import { ActionTypes } from "../constants/action-types";

export const loginUser = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user/login`,
      dataForm
    );
    const user = result.data.data;
    const role = result.data.data.roles;
    const users = {
      roles: result.data.data.roles,
      email: result.data.data.email,
    };
    console.log(users);
    const token = result.data.data.token;
    const id = result.data.data.id;
    localStorage.setItem("token", token);
    localStorage.setItem("roles", role);
    localStorage.setItem("id", id);
    localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      token: token.data,
      payload: user,
    });
    swal.fire({
      icon: "success",
      text: result.data.message,
    });
    navigate("/home");
  } catch (error) {
    swal.fire({
      icon: "error",
      text: error.response.data.message,
    });
    console.log(error);
  }
};

export const signUp = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user/registrasi`,
      dataForm
    );
    const user = result.data.data;
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    swal.fire({
      icon: "success",
      title: "You're data has beed registered.",
      text: "Try logging in",
    });
    navigate("/login");
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: "Data is invalid",
    });
    console.log(error);
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_PRODUCT",
    });

    dispatch({
      type: "SIGN_OUT",
    });
  };
};

export const updateUser = (users) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: users,
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};
