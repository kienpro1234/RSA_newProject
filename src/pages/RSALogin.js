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
import { connect, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import { auth } from "../FireBase/FireBaseConfig/fireBaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { RSAglobalNavigate } from "../util/RSAGlobalNavigate";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// export let loggined = false;
export default function LoginCyberBugs(props) {
  // const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
  //   props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const auth = getAuth();
  async function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user)
      navigate("/");
      localStorage.setItem("loggined", "true");
      localStorage.setItem("email", JSON.stringify(email))
      dispatch({
        type: "LOGGINED_SUCCESS",
        loggined: true,
      })
    })
    .catch((err) => {
      console.log(err)
      localStorage.setItem("loggined", "false");
      dispatch({
        type: "LOGGINED_FAILED",
        loggined: false,
      })
    })
  }


  return (
    <form onSubmit={handleSignIn} className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3
          style={{ fontWeight: 300, fontSize: 35 }}
          className="text-center mb-4"
        >
          Login
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
        {/* <div className="text-danger">{errors.email}</div> */}
        <div>
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
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
            Login
          </Button>
        </div>
        <div
          className="mt-3 d-flex flex-row text-start"
          style={{ minWidth: "400px", fontSize: "20px" }}
        >
          <p className="me-4">Don't have an account ?</p>
          <NavLink to={"/register"}>Sign Up</NavLink>
        </div>
        <div className="mt-3">
          <Button
            style={{ backgroundColor: "rgb(59,89,142)" }}
            className="me-3"
            type="primary"
            size="large"
            shape="circle"
          >
            <i className="fab fa-facebook-f"></i>
          </Button>
          <Button type="primary" size="large" shape="circle">
            <i className="fab fa-twitter"></i>
          </Button>
        </div>
      </div>
    </form>
  );
}

// const userLoginFormWithFormik = withFormik({
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
//     signInWithEmailAndPassword(auth, values.email, values.password)
//       .then((userCredential) => {
//         // Đăng nhập thành công
//         const user = userCredential.user;
//         console.log("User logged in:", user);
//         // Chuyển hướng sang trang chủ
//         RSAglobalNavigate("/");
//       })
//       .catch((error) => {
//         console.error("Error logging in:", error);
//         setSubmitting(false);
//       });
//   },
//   displayName: "Login CyberBugs",
// })(LoginCyberBugs);

// export default connect()(userLoginFormWithFormik);
