import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import { FaEdit } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { useTheme } from "./ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  // const [navbarHeight, setNavbarHeight] = useState(0);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    profile: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();
  const notify1 = () => toast("Selected Successfully!");
  const notify2 = () => toast("Updated Successfully!");

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          withCredentials: true,
        }
      );
      setProfileData(response.data);
      // setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   const navbarElement = document.querySelector(".navbar");
  //   if (navbarElement) {
  //     const height = navbarElement.offsetHeight;
  //     setNavbarHeight(height);
  //   }
  // }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    if (selectedFile) {
      console.log("notify1 triggered");
      notify1();
    }
  };

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   if (selectedFile) {
  //     console.log("notify1 triggered");
  //     notify1();
  //   }
  // };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      await axios.post("http://localhost:5000/api/user/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh profile data after upload
      fetchProfileData();
      notify2();
    } catch (error) {
      console.error(error);
    }
  };

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <>
      <NavBar />
      <div
        // className="profileDiv"
        className={`profileDiv ${
          theme === "dark" ? "dark-theme" : "light-theme"
        }`}
        // style={{ height: `calc(100% - ${navbarHeight}px)` }}
      >
        <ProfileModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          profileData={profileData}
        />
        {/* <div className="card mb-3 cardDiv" style={{ maxWidth: "540px" }}> */}
        <div className="card mb-3 cardDiv">
          <div className="row g-0 profilePageMainDiv">
            <div className="col-md-6 profilePicDiv">
              <img
                src={`http://localhost:5000/images/${profileData.profile}`}
                // className="img-fluid rounded-start"
                className="profilePic"
                alt="profile"
              />
              <div className="labelNameEdit">
                <label htmlFor="fileInput" className="custom-file-upload">
                  <h6>Choose file</h6>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  name="image"
                  // name="profile_pic"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button onClick={handleUpload}>
                  <h6>Upload</h6>
                </button>
              </div>
            </div>
            <div className="col-md-6 profileCardDiv">
              <div className="card-body">
                {/* <div> */}
                <h3 className="card-title">Profile</h3>
                {/* </div> */}
                <div>
                  <h5>Name : {profileData.name}</h5>
                  <h5>Email : {profileData.email}</h5>
                </div>
                <div className="editProfileButton">
                  <button onClick={() => setModalOpen(true)}>
                    <FaEdit size={"25px"} /> <h6>EDIT</h6>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
