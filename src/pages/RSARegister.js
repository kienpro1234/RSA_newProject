import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase/FireBaseConfig/fireBaseConfig";
import Swal from 'sweetalert2'


export default function RegisterCyberBugs(props) {
  // const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
  //   props;
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      Swal.fire({
        title: 'Đăng kí thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        title: 'Đăng kí thất bại!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    });
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3
          style={{ fontWeight: 300, fontSize: 35 }}
          className="text-center mb-4"
        >
          Sign Up
        </h3>
        <div>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            style={{ minWidth: "400px" }}
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
        </div>
        {/* <div className="text-danger ">{errors.email}</div> */}
        <div>
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            name="password"
            style={{ minWidth: "400px" }}
            className="mt-3"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </div>
        {/* <div className="text-danger">{errors.password}</div> */}
        <div className="row"></div>
        <div className="d-flex flex-row">
          <Button
            htmlType="submit"
            className="mt-3"
            style={{ backgroundColor: "rgb(102,117,223)", minWidth: 400 }}
            type="primary"
            size="large"
          >
            Sign Up
          </Button>
        </div>
        <div
          className="mt-3 d-flex flex-row text-start"
          style={{ minWidth: "400px", fontSize: "20px" }}
        >
          <p className="me-4">Already have an account?</p>
          <NavLink to={"/login"}>Sign in</NavLink>
        </div>
      </div>
    </form>
  );
}


