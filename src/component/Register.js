import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeContext";
import { BiSolidHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();
  // const [navbarHeight, setNavbarHeight] = useState(0);
  const [eye, setEye] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  // useEffect(() => {
  //   const navbarElement = document.querySelector(".navbar");
  //   if (navbarElement) {
  //     const height = navbarElement.offsetHeight;
  //     setNavbarHeight(height);
  //   }
  // }, []);

  const { theme } = useTheme();
  const navigate = useNavigate();

  const notify = () => toast("Registered Successfully!");
  // const notify2 = () => toast("already!");

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
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = (
        <div>
          Password must meet the following criteria:
          <br />
          - At least 8 characters
          <br />
          - At least one number
          <br />
          - At least one uppercase letter
          <br />
          - At least one lowercase letter
          <br />- At least one special character (!@#$%^&*)
        </div>
      );
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData,
          { withCredentials: true }
        );

        // const response = await axios.post(
        //   "http://localhost:5000/api/register",
        //   formData,
        //   { withCredentials: true }
        // );
        if (response.status === 201) {
          console.log(response.status);
          notify();
          setTimeout(async () => {
            await axios.post("http://localhost:5000/api/auth/logout", null, {
              withCredentials: true,
            });
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        if (error.response.data.error) {
          // console.log(error.response);
          // console.log(error.response.data.error);
          toast.error(error.response.data.error);
          // notify2();
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
      {/* <div style={{ height: `calc(100vh - ${navbarHeight}px)` }}> */}
      <Navbar />
      <div className="loginBackgroundContainer">
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

      <div className="loginBackground2 d-flex align-items-center justify-content-center">
        <div className="container loginDiv">
          <h4>{t("register")}</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t("name")}</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                required
                className={`form-control ${errors.name && "is-invalid"}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t("email")}</label>
              <input
                id="email"
                placeholder="Enter Email"
                type="email"
                required
                className={`form-control ${errors.email && "is-invalid"}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">{t("password")}</label>
              <div className="passwordContainer">
                <input
                  id="password"
                  placeholder="Enter Password"
                  type={eye ? "text" : "password"}
                  className={`form-control ${errors.password && "is-invalid"}`}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {eye ? (
                  <FaEye className="eyeImage" onClick={handleEyeClick} />
                ) : (
                  <BiSolidHide className="eyeImage" onClick={handleEyeClick} />
                )}
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {t("sign_up")}
            </button>

            <div className="bottom-text">
              <p>
                {t("already")} <Link to="/">{t("log")}</Link>
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

export default Register;
