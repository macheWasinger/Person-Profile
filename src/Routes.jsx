import React, { useEffect, useContext } from "react";
import MyProvider, { AppContext } from "./context/MyProvider";

import {
  BrowserRouter,
  Routes as Rutas,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";

/********* import COMPONENTS *********/
import Login from "./pages/Login";
import User_profile from "./pages/User_profile";
import UserRegister from "./pages/UserRegister";
import Full_picture from "./pages/Full_picture";
import Full_coverPhoto from "./pages/Full_coverPhoto";

/********* import CSS *********/
import "./Routes.css";
import "./css/Login/Login.css";
import "./css/Login/Login_mobile.css";

import "./css/UserRegister/UserRegister.css";
import "./css/UserRegister/UserRegister_mobile.css";

import "./css/UserProfile/User_profile.css";
import "./css/UserProfile/User_profile_mobile.css";

import "./css/Loading.css";

import "./css/Header/Header.css";
import "./css/Header/Header_mobile.css";

import "./css/EditContactInfo/Edit_contact_info.css";
import "./css/EditContactInfo/Edit_contact_info_mobile.css";

import "./css/FullPicture/Full_picture.css";
import "./css/FullPicture/Full_picture_mobile.css";

import "./css/UpdateImage/Update_image.css";
import "./css/UpdateImage/Update_image_mobile.css";

import "./css/UploadAvatar.css";

import "./css/UpdateCoverPhoto/Update_coverPhoto.css";
import "./css/UpdateCoverPhoto/Update_coverPhoto_mobile.css";

import "./css/FullCoverPhoto/Full_coverPhoto.css";
import "./css/FullCoverPhoto/Full_coverPhoto_mobile.css";

/*******************************/

function Home(props) {
  const provider = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionActived = JSON.parse(
      sessionStorage.getItem("session_actived")
    );

    const show_registerUser = JSON.parse(
      sessionStorage.getItem("show_registerUser")
    );

    const show_fullPicture = JSON.parse(
      sessionStorage.getItem("show_fullPicture")
    );

    const show_full_coverPhoto = JSON.parse(
      sessionStorage.getItem("show_full_coverPhoto")
    );

    if (sessionActived) {
      navigate(`/user-profile`, { replace: true });
    } else {
      navigate("/login", { replace: true });
    }

    if (show_registerUser) {
      navigate("/user-register", { replace: true });
    }

    if (show_fullPicture) {
      navigate("/profile-photo", { replace: true });
    }

    if (show_full_coverPhoto) {
      navigate("/cover-photo", { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
}

function Routes() {
  return (
    <MyProvider className="Routes">
      <BrowserRouter>
        <Rutas>
          <Route path="/" element={<Home />}>
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<User_profile />} />

            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/profile-photo" element={<Full_picture />} />
            <Route path="/cover-photo" element={<Full_coverPhoto />} />
          </Route>
        </Rutas>
      </BrowserRouter>
    </MyProvider>
  );
}

export default Routes;
