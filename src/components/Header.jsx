import React, { useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { AppContext } from "../context/MyProvider";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import logoPP from "../video/logo_PP-4.mp4";
import default_profilePhoto_man from "../img/ghost_perfil_man.jpg";
import default_profilePhoto_woman from "../img/ghost_perfil_woman.png";

import ghost_unisex from "../img/ghost_unisex.jpg";

const Header = () => {
  const provider = useContext(AppContext);

  const ref = useRef(null);

  const active_userID = sessionStorage.getItem("user_id");

  const userData = JSON.parse(sessionStorage.getItem("user_info"));

  const [searchParams, setSearchParams] = useSearchParams();

  const user_logOut = () => {
    sessionStorage.removeItem("searched_user_id");
    sessionStorage.removeItem("session_actived");

    window.location.href = "./";
  };

  const small_picture_handler = () => {
    provider.setActivate_smallPicture(!provider.activate_smallPicture);
    provider.setActivate_iconSearch((provider.activate_iconSearch = false));
  };

  const handleChange = (e) => {
    let filter_user = e.target.value;

    if (filter_user) {
      setSearchParams({
        name: filter_user,
      });
    } else {
      setSearchParams({});
    }
  };

  const search_user_handler = async (e) => {
    e.preventDefault();
    provider.setActivate_smallPicture(false);

    try {
      const users_data = await getDocs(collection(db, "users"));
      users_data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((user) => {
          let filterUser = searchParams.get("name");

          let fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;

          let reverse_fullName = `${user.lastName.toLowerCase()} ${user.firstName.toLowerCase()}`;

          let user_name = user.username.toLowerCase();

          if (
            fullName.startsWith(filterUser.toLowerCase()) ||
            reverse_fullName.startsWith(filterUser.toLowerCase()) ||
            user_name.startsWith(filterUser.toLowerCase())
          ) {
            provider.setActivate_upload_coverPhoto(false);
            provider.setActivate_image_upload(false);

            sessionStorage.setItem("active_change_user", JSON.stringify(true));

            sessionStorage.setItem("searched_user_id", user.id);

            setSearchParams({ name: `${user.firstName}.${user.lastName}` });

            ref.current.value = "";

            return user;
          }
        });

      provider.setActivate_iconSearch(false);
    } catch (error) {
      console.log(error);
    }
  };

  const back_toProfile_handler = () => {
    provider.setActivate_upload_coverPhoto(false);
    provider.setActivate_image_upload(false);
    sessionStorage.setItem("searched_user_id", active_userID);

    setTimeout(() => {
      sessionStorage.setItem("active_change_user", JSON.stringify(false));

      setSearchParams({ name: `${userData.firstName}.${userData.lastName}` });
    }, 400);
  };

  return (
    <div className="header_container d-flex justify-content-between">
      <section className="logoPP-container">
        <video
          loading="lazy"
          autoPlay
          loop
          muted
          className="logoPP-style"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
          src={logoPP}
        ></video>
      </section>

      <section
        className={`searchUser_mainContainer ${
          provider.activate_iconSearch && "activate_search-container"
        }`}
      >
        <button
          className={`material-icons search-button ${
            provider.activate_iconSearch && "hide_iconSearch"
          }`}
          onClick={() =>
            provider.setActivate_iconSearch(!provider.activate_iconSearch)
          }
        >
          search
        </button>
        <form onSubmit={search_user_handler} className="search-input_container">
          <input
            ref={ref}
            className={provider.activate_iconSearch ? "move_text" : "hide_text"}
            type="text"
            size="60"
            maxLength="60"
            placeholder={
              provider.activate_iconSearch ? "Search user in PP" : ""
            }
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="hide-button_container"></button>
        </form>
      </section>

      <section className="right-content d-flex align-items-center justify-content-center">
        <div className="infoProfile-header_container d-flex align-items-center justify-content-center mx-2 pt-2 text-white">
          <h5 className="text_firstName-lastName">{`${userData.firstName} ${userData.lastName}`}</h5>
          <h6
            className={`text-nickname mx-2 ${
              userData.nickName === "" ? "hide_section" : ""
            }`}
          >{`(${userData.nickName})`}</h6>
        </div>

        <div
          className={`profile-picture_container ${
            provider.activate_smallPicture ? "disable_effect-background" : ""
          }`}
          onClick={() => small_picture_handler()}
        >
          <img
            loading="lazy"
            src={
              userData.image.url_photo === "" && userData.gender === "male"
                ? default_profilePhoto_man
                : userData.image.url_photo === "" &&
                  userData.gender === "female"
                ? default_profilePhoto_woman
                : userData.gender === ""
                ? ghost_unisex
                : userData.image.url_photo
            }
            alt=""
          />
          {provider.activate_smallPicture ? (
            <div className="small-picture__logout-button_container">
              <div
                className="back_to_profile_container"
                onClick={() => back_toProfile_handler()}
              >
                <img
                  loading="lazy"
                  src={
                    userData.image.url_photo === "" &&
                    userData.gender === "male"
                      ? default_profilePhoto_man
                      : userData.image.url_photo === "" &&
                        userData.gender === "female"
                      ? default_profilePhoto_woman
                      : userData.gender === ""
                      ? ghost_unisex
                      : userData.image.url_photo
                  }
                  style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
                  className="mx-1"
                  alt=""
                />
                <span className="text-back_toProfile">Back to profile</span>
              </div>

              <div className="logout_button-text" onClick={() => user_logOut()}>
                <button className="material-icons logOut-button_container mx-1">
                  logout
                </button>
                <span>Log out</span>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Header;
