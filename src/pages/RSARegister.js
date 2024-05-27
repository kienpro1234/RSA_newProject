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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function RegisterCyberBugs(props) {
  // const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
  //   props;
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
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

// const userRegisterFormWithFormik = withFormik({
//   mapPropsToValues: () => ({
//     email: "",
//     password: "",
//   }),

//   validationSchema: Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must have min 6 characters")
//       .max(20, "Password must have max 12 characters")
//       .required("Password is required"),
//   }),

//   handleSubmit: (values, { props, setSubmitting }) => {
//     createUserWithEmailAndPassword(auth, values.email, values.password)
//       .then((userCredential) => {
//         // Đăng ký thành công
//         const user = userCredential.user;
//         console.log("User registered:", user);
//         // Chuyển hướng sang trang đăng nhập
//         RSAglobalNavigate("/login");
//       })
//       .catch((error) => {
//         console.error("Error registering user:", error);
//         setSubmitting(false);
//       });
//   },
//   displayName: "Register CyberBugs",
// })(RegisterCyberBugs);

// export default connect()(userRegisterFormWithFormik);
