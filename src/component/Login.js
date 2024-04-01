import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeContext";
// import Main from "./Main";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

function Login() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [eye, setEye] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const navbarElement = document.querySelector(".navbar");
    if (navbarElement) {
      const height = navbarElement.offsetHeight;
      setNavbarHeight(height);
    }
  }, []);

  const { theme } = useTheme();
  const navigate = useNavigate();
  const notify = () => toast("Logged In Success!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/",
          formData,
          { withCredentials: true }
        );
        if (response.status === 201) {
          notify();
          setTimeout(() => {
            if (response.status) {
              navigate("/home");
            }
          }, 1000);
        }
      } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          console.error(error);
        }
      }
    }
  }

  function handleEyeClick() {
    setEye((prevEye) => !prevEye);
  }

  return (
    <>
      {/* <div> */}
      <Navbar />
      <div
        className="loginBackgroundContainer"
        style={{ height: `calc(100vh - ${navbarHeight}px)` }}
      >
        {/* Background container */}
        <div
          className={`loginBackground ${
            theme === "dark" ? "dark-login" : "light-login"
          }`}
        ></div>
      </div>

      {/* <div className="d-flex align-items-center justify-content-center loginBackground"> */}
      {/* <div
          className={`d-flex align-items-center justify-content-center loginBackground ${
            theme === "dark" ? "dark-login" : "light-login"
          }`}
        > */}

      <div
        className="loginBackground2 d-flex align-items-center justify-content-center"
        style={{ height: `calc(100vh - ${navbarHeight}px)` }}
      >
        <div className="container loginDiv">
          <h4>Login</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="passwordContainer">
                <input
                  placeholder="Enter Password"
                  id="password"
                  type={eye ? "text" : "password"}
                  className={`form-control ${errors.password && "is-invalid"}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {eye ? (
                  <FaEye className="eyeImage" onClick={handleEyeClick} />
                ) : (
                  <BiSolidHide className="eyeImage" onClick={handleEyeClick} />
                )}
                {/* <BiSolidHide onClick={handleEyeClick} /> */}
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <div className="bottom-text">
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Login;
