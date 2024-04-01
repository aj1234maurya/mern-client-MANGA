import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "./ThemeContext";

function ProfileModal({ isOpen, onClose }) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();

  async function fetchProfileData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          withCredentials: true,
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const notify = () => toast("Updated Successfully!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!profileData.email) {
      newErrors.email = "Email is required";
    }
    if (!profileData.name) {
      newErrors.name = "Name is required";
    }
    if (profileData.password) {
      console.log("password present:", profileData.password);
      console.log("confirm:- ", confirmPassword);
      if (profileData.password !== confirmPassword) {
        newErrors.password = "Password Does Not Match";
        newErrors.confirmPassword = "Password Does Not Match";
      }
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (profileData.password && !passwordRegex.test(profileData.password)) {
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
      console.log("profile updated");
      try {
        const response = await axios.put(
          "http://localhost:5000/api/user/profile",
          profileData,
          { withCredentials: true }
        );
        if (response.status === 200) {
          notify();
          setProfileData((prevData) => ({
            ...prevData,
            password: "",
          }));
          setConfirmPassword("");
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

  function handleClose() {
    setErrors({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
    setProfileData({
      name: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
    onClose();
  }

  // }

  return (
    <>
      <div
        className={isOpen ? "modal fade show" : "modal fade"}
        style={{ display: isOpen ? "block" : "none" }}
        // id="staticBackdrop"
        id="modalBackground"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {/* <div className="modal-content"> */}
          <div
            className={`modal-content ${
              theme === "dark" ? "dark-modal " : "light-theme"
            }`}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {/* comment start */}

              <form
                className="needs-validation"
                noValidate
                // onSubmit={handleSubmit}
              >
                <div className="formDiv form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Name"
                    required
                    className={`form-control ${errors.name && "is-invalid"}`}
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="formDiv form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    placeholder="Enter Email"
                    type="email"
                    required
                    className={`form-control ${errors.email && "is-invalid"}`}
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="formDiv form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    id="password"
                    placeholder="Enter Password"
                    type="password"
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    name="password"
                    // required
                    value={profileData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="formDiv form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword && "is-invalid"
                    }`}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* <button type="submit" className="btn btn-primary">
                      Update
                    </button> */}
              </form>

              {/* comment end */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileModal;
