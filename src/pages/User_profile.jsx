import React, { useState, useEffect, useContext } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { AppContext } from "../context/MyProvider";

import { firebaseApp } from "../firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Header from "../components/Header";
import Edit_contact_info from "../pages/Edit_contact_info";
import Update_image from "../components/Update_image";
import Update_coverPhoto from "../components/Update_coverPhoto";

/****** IMPORT THE IMAGES ******/

import default_profilePhoto_man from "../img/ghost_perfil_man.jpg";

import default_profilePhoto_woman from "../img/ghost_perfil_woman.png";

import ghost_unisex from "../img/ghost_unisex.jpg";
/*-----------------------------------------------------*/

const storage = getStorage(firebaseApp);

const User_profile = () => {
  const provider = useContext(AppContext);
  const navigate = useNavigate();

  const user_id = sessionStorage.getItem("user_id");
  const searched_user_id = sessionStorage.getItem("searched_user_id");

  const active_change_user = JSON.parse(
    sessionStorage.getItem("active_change_user")
  );

  const [search_params, setSearch_params] = useSearchParams();

  let [user_item, setUser_item] = useState({});

  let [profile_info_header, setProfile_info_header] = useState("");

  let [profile_image, setProfile_image] = useState("");

  let [coverPhoto, setCoverPhoto] = useState("");

  const [activate_showComponent, setActivate_showComponent] = useState(false);

  const [active_effectCamera, setActive_effectCamera] = useState(false);

  const [image_update_preview, setImage_update_preview] = useState(false);

  const [coverPhoto_update_preview, setCoverPhoto_update_preview] =
    useState(false);

  let [edit_method_activated, setEdit_method_activated] = useState(false);

  let [newImage, setNewImage] = useState(null);
  let [current_date_newImage, setCurrent_date_newImage] = useState("");
  let [file_profilePhoto, setFile_profilePhoto] = useState(null);

  let [newCoverPhoto, setNewCoverPhoto] = useState(null);
  let [current_date_newCoverPhoto, setCurrent_date_newCoverPhoto] =
    useState("");
  let [file_coverPhoto, setFile_coverPhoto] = useState(null);

  let [update_full_image, setUpdate_full_image] = useState(false);
  let [update_full_coverPhoto, setUpdate_full_coverPhoto] = useState(false);

  useEffect(() => {
    const getFirestoreData = async () => {
      try {
        const userDoc = doc(db, "users", user_id);
        const getUserData = await getDoc(userDoc);

        if (getUserData.exists()) {
          sessionStorage.setItem(
            "user_info",
            JSON.stringify(getUserData.data())
          );

          let userInfo = JSON.parse(sessionStorage.getItem("user_info"));

          window.document.title = `${userInfo.firstName} ${userInfo.lastName} | Person Profile`;

          sessionStorage.setItem(
            "updated_profilePhoto",
            userInfo.image.url_photo
          );
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFirestoreData();
  }, [JSON.parse(sessionStorage.getItem("user_info"))]);

  useEffect(() => {
    const getFirestoreData = async () => {
      try {
        const userDoc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        const getUserData = await getDoc(userDoc);

        if (getUserData.exists()) {
          setUser_item((user_item = getUserData.data()));
          setActivate_showComponent(true);

          setProfile_image(
            (profile_image = getUserData.data().image.url_photo)
          );

          setCoverPhoto(
            (coverPhoto = getUserData.data().cover_photo.url_coverPhoto)
          );
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFirestoreData();
  }, [user_item]);

  useEffect(() => {
    const getFirestoreData = async () => {
      try {
        const userDoc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        const getUserData = await getDoc(userDoc);

        if (getUserData.exists()) {
          setSearch_params({
            name: `${getUserData.data().firstName}.${
              getUserData.data().lastName
            }`,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFirestoreData();
  }, []);

  useEffect(() => {
    const getFirestoreData = async () => {
      try {
        const userDoc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        const getUserData = await getDoc(userDoc);

        if (getUserData.exists()) {
          setProfile_image(
            (profile_image = getUserData.data().image.url_photo)
          );
          setUser_item((user_item = getUserData.data()));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFirestoreData();
  }, [sessionStorage.getItem("onload_fullPhoto")]);

  useEffect(() => {
    const getFirestore_Data = async () => {
      try {
        const userDoc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        const getUserData = await getDoc(userDoc);

        if (getUserData.exists()) {
          setCoverPhoto(
            (coverPhoto = getUserData.data().cover_photo.url_coverPhoto)
          );

          setUser_item((user_item = getUserData.data()));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFirestore_Data();
  }, [sessionStorage.getItem("onload_full_coverPhoto")]);

  const handler_editUserData = () => {
    provider.setActivate_image_upload(false);
    provider.setActivate_upload_coverPhoto(false);
    setEdit_method_activated((edit_method_activated = !false));
  };

  const updateUserData = async (e) => {
    setUser_item((user_item = e));

    try {
      const userDoc = doc(db, "users", user_item.id);
      const getUserData = await getDoc(userDoc);

      if (getUserData.exists()) {
        window.document.title = `${getUserData.data().firstName} ${
          getUserData.data().lastName
        } | Person Profile`;

        setSearch_params({
          name: `${getUserData.data().firstName}.${
            getUserData.data().lastName
          }`,
        });

        // El objeto: "update_data" con los datos actualizados del user, lo traigo desde el componente "Edit_contact_info" mediante el evento 'e' y se lo paso a la variable de estado "user_item":
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfilePicture = (e) => {
    setProfile_image((profile_image = e));

    setProfile_info_header((profile_info_header = e));
  };

  const update_cover_photo = (e) => {
    setCoverPhoto((coverPhoto = e));
  };

  const imageUpload_handler = () => {
    provider.setActivate_upload_coverPhoto(false);
    provider.setActivate_image_upload(!provider.activate_image_upload);
  };

  const coverUpload_handler = () => {
    provider.setActivate_image_upload(false);
    provider.setActivate_upload_coverPhoto(
      !provider.activate_upload_coverPhoto
    );
  };

  const full_picture_handler = () => {
    if (user_item.full_image === "") {
      sessionStorage.setItem("show_fullPicture", JSON.stringify(false));
    } else {
      provider.setActivate_upload_coverPhoto(false);
      sessionStorage.setItem("show_fullPicture", JSON.stringify(true));

      navigate("/profile-photo");
    }
  };

  const full_coverPhoto_handler = () => {
    if (user_item.full_cover_photo === "") {
      sessionStorage.setItem("show_full_coverPhoto", JSON.stringify(false));
      provider.setActivate_upload_coverPhoto(false);
    } else {
      provider.setActivate_image_upload(false);
      sessionStorage.setItem("show_full_coverPhoto", JSON.stringify(true));
      provider.setActivate_upload_coverPhoto(false);
      navigate("/cover-photo");
    }
  };

  const closeWindow = (e) => {
    setEdit_method_activated((edit_method_activated = e));
  };

  const close_updateImage_window = (e) => {
    setImage_update_preview(e);
    setUpdate_full_image((update_full_image = e));
  };

  const close_update_cover_photo_window = (e) => {
    setCoverPhoto_update_preview(e);
    setUpdate_full_coverPhoto((update_full_coverPhoto = e));
  };

  const disable_logout_menu_handler = () => {
    provider.setActivate_smallPicture(false);
    provider.setActivate_iconSearch(false);
  };

  /********* NEW PROFILE PHOTO *********/
  const newImage_handler = async (e) => {
    provider.setActivate_image_upload(false);

    let today = new Date();
    let current_day = today.getDate();
    let current_month = today.getMonth() + 1;

    let months_array = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];

    months_array.forEach((month, index) => {
      let month_today = index + 1;
      if (month_today === current_month) {
        setCurrent_date_newImage(
          (current_date_newImage = `${month}, ${current_day}`)
        );
      }
    });

    let urlImage;

    // Detectar file
    setFile_profilePhoto((file_profilePhoto = e.currentTarget.files[0]));

    // Upload this to storage
    const ref_file = ref(
      storage,
      `${user_item.firstName} ${user_item.lastName}/Profile photo/${file_profilePhoto.name}`
    );
    await uploadBytes(ref_file, file_profilePhoto);

    // Get image URL
    urlImage = await getDownloadURL(ref_file);

    setNewImage(
      (newImage = {
        url_photo: urlImage,
        currentDate: current_date_newImage,
      })
    );

    provider.setObject_newImage(
      (provider.object_newImage = {
        url_photo: urlImage,
        currentDate: current_date_newImage,
      })
    );

    setImage_update_preview(true);
  };

  const update_full_image_handler = async (e) => {
    if (e) {
      try {
        const get_userDoc = doc(db, "users", user_id);
        await updateDoc(get_userDoc, {
          full_image: newImage.url_photo,
          array_likes_profilePhoto: [],
          array_msgObjects_profilePhoto: [],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  /*************************************/

  /*//////// NEW COVER PHOTO ////////*/
  const newCoverPhoto_handler = async (e) => {
    provider.setActivate_upload_coverPhoto(false);

    let today = new Date();
    let current_day = today.getDate();
    let current_month = today.getMonth() + 1;

    let months_array = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];

    months_array.forEach((month, index) => {
      let month_today = index + 1;
      if (month_today === current_month) {
        setCurrent_date_newCoverPhoto(
          (current_date_newCoverPhoto = `${month}, ${current_day}`)
        );
      }
    });

    let urlImage;

    // Detectar file
    setFile_coverPhoto((file_coverPhoto = e.currentTarget.files[0]));

    // Upload this to storage
    const ref_file = ref(
      storage,
      `${user_item.firstName} ${user_item.lastName}/Cover photo/${file_coverPhoto.name}`
    );
    await uploadBytes(ref_file, file_coverPhoto);

    // Get image URL
    urlImage = await getDownloadURL(ref_file);

    setNewCoverPhoto(
      (newCoverPhoto = {
        url_coverPhoto: urlImage,
        currentDate: current_date_newCoverPhoto,
      })
    );

    setCoverPhoto_update_preview(true);
  };

  const update_full_cover_photo_handler = async (e) => {
    if (e) {
      try {
        const full_coverPhoto = doc(db, "users", user_id);
        await updateDoc(full_coverPhoto, {
          full_cover_photo: newCoverPhoto.url_coverPhoto,
          array_likes_coverPhoto: [],
          array_msgObjects_coverPhoto: [],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  /*////////////////////////////////////*/

  return (
    <div
      className={`userProfile__main-container ${
        edit_method_activated && "disable-scroll"
      }`}
    >
      {activate_showComponent ? (
        <>
          <Header />

          <div
            className={`userProfile_container ${
              (image_update_preview ||
                edit_method_activated ||
                coverPhoto_update_preview) &&
              "enable_fixed"
            }`}
            style={{
              width: "100%",
              height: "89.5vh",
              paddingTop: "1rem",
              backgroundColor: "#000",
            }}
            onClick={() => disable_logout_menu_handler()}
          >
            <section
              className="user_data-table_container"
              style={{
                margin: "auto",
              }}
            >
              {/************ COVER PHOTO CONTAINER ************/}
              <div className="cover-photo_container">
                {/*----- SEE & EDIT COVER PHOTO CONTAINER -----*/}
                <section
                  className={`coverPhoto-content ${
                    provider.activate_upload_coverPhoto
                      ? "disable_effect-background"
                      : ""
                  }`}
                >
                  <div className="cover_photo_container">
                    {user_item.cover_photo.url_coverPhoto !== "" && (
                      <img
                        loading="lazy"
                        src={
                          user_item.cover_photo.url_coverPhoto !== "" &&
                          coverPhoto
                        }
                        alt=""
                        onClick={() => full_coverPhoto_handler()}
                      />
                    )}
                  </div>

                  <div
                    className={`upload_coverPhoto_container ${
                      provider.activate_upload_coverPhoto ? "d-block" : "d-none"
                    }`}
                  >
                    <div
                      className="full_coverPhoto_container"
                      onClick={() => full_coverPhoto_handler()}
                    >
                      <span className="material-icons">photo</span>
                      <p>See cover photo</p>
                    </div>

                    <div className="file_coverPhoto">
                      <label
                        htmlFor="imageFile"
                        className="label_upload_coverPhoto"
                      >
                        <span className="material-icons">add_a_photo</span>
                        <p>Upload cover photo</p>
                      </label>
                      <input
                        type="file"
                        id="imageFile"
                        accept="image/*"
                        onChange={(e) => newCoverPhoto_handler(e)}
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div
                    className={`coverPhoto-icon_container ${
                      active_change_user ? "d-none" : "d-flex"
                    }`}
                    onClick={() => coverUpload_handler()}
                  >
                    <span className="material-icons camera-icon_coverPhoto">
                      camera_alt
                    </span>
                    <span className="text_edit-coverPhoto">
                      Edit cover photo
                    </span>
                  </div>
                </section>

                {/*-----------------------------------------*/}
              </div>
              {/*//// PROFILE IMAGE, FULLNAME, NICKNAME ////*/}
              <div className="image-textNames__container">
                <div className="profilePhoto-camera_container">
                  <section className="pictures_main-container">
                    <div
                      className={`profilePicture-container ${
                        provider.activate_image_upload
                          ? "disable_effect-background"
                          : ""
                      }`}
                      onClick={() => imageUpload_handler()}
                    >
                      <img
                        loading="lazy"
                        src={
                          user_item.image.url_photo === "" &&
                          user_item.gender === "male"
                            ? default_profilePhoto_man
                            : user_item.image.url_photo === "" &&
                              user_item.gender === "female"
                            ? default_profilePhoto_woman
                            : user_item.gender === ""
                            ? ghost_unisex
                            : profile_image
                        }
                        alt=""
                      />
                      <div
                        className={`profile_image_update_container ${
                          provider.activate_image_upload ? "d-block" : "d-none"
                        }`}
                      >
                        {user_item.image.url_photo !== "" && (
                          <div
                            className="full-picture_container"
                            onClick={() => full_picture_handler()}
                          >
                            <span className="material-icons">portrait</span>
                            <p>See profile picture</p>
                          </div>
                        )}

                        <div
                          className={`file ${
                            active_change_user ? "d-none" : "d-flex"
                          }`}
                        >
                          <label
                            htmlFor="imageFile"
                            className="label_imageUpload"
                          >
                            <span className="material-icons">add_a_photo</span>
                            <p>Update profile picture</p>
                          </label>
                          <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            onChange={(e) => newImage_handler(e)}
                            defaultValue=""
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                  <section
                    className={`photo-icon_container ${
                      active_effectCamera
                        ? "change_cameraColor"
                        : active_change_user
                        ? "hide_camera-icon"
                        : "d-block"
                    }`}
                    onMouseOver={() => setActive_effectCamera(true)}
                    onMouseOut={() => setActive_effectCamera(false)}
                  >
                    <span className="material-icons camera-icon">
                      camera_alt
                    </span>
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={(e) => newImage_handler(e)}
                      defaultValue=""
                      className="inputFile-photoIcon"
                    />
                  </section>
                </div>

                <section className="firstName-lastName-nickName_container">
                  <h3 className="text-title_user-dataTable">
                    {`${user_item.firstName} ${user_item.lastName}`}
                  </h3>
                  <h5
                    className={`text-nickName_user-dataTable ${
                      user_item.nickName === "" ? "hide_section" : ""
                    }`}
                  >
                    {`(${user_item.nickName})`}
                  </h5>
                </section>
              </div>
              {/*//////////////////////////////////////////////*/}
              {/*************************************************/}

              {/************* CONTACT INFO SECTION *************/}
              <div className="text-white contact-info_container">
                <section className="title-edit__container d-flex justify-content-between align-items-start">
                  <h3 className="text_contact-info">Contact information</h3>

                  <button
                    className={`material-icons icon-edit ${
                      active_change_user ? "d-none" : "d-block"
                    }`}
                    onClick={() => handler_editUserData()}
                  >
                    edit
                  </button>
                </section>
                <section className="user-info_container">
                  <div className="userInfo_content">
                    <div
                      className={`user-data__main-section d-flex ${
                        user_item.phone === "" ? "hide_section" : ""
                      }`}
                    >
                      <span className="material-icons phoneIcon">phone</span>
                      <div className="userData_container">
                        <h5 className="title-phone">Phone</h5>
                        <span className="text-phone text-white">{`${user_item.phone} (Mobile)`}</span>
                      </div>
                    </div>

                    <div
                      className={`user-data__main-section d-flex ${
                        user_item.address.province === "" &&
                        user_item.address.city === "" &&
                        user_item.address.country === ""
                          ? "hide_section"
                          : ""
                      }`}
                    >
                      <span className="material-icons addressIcon">
                        location_on
                      </span>
                      <div className="userData_container">
                        <h5 className="title-address">Address</h5>
                        <span className="text-address">{`${user_item.address.city}, ${user_item.address.province}, ${user_item.address.country}.`}</span>
                      </div>
                    </div>

                    <div className="user-data__main-section d-flex">
                      <span className="material-icons emailIcon">email</span>
                      <div className="userData_container">
                        <h5 className="title-email">Email</h5>
                        <span className="text-email">{user_item.email}</span>
                      </div>
                    </div>

                    <div
                      className={`user-data__main-section d-flex ${
                        user_item.birthDate === "" ? "hide_section" : ""
                      }`}
                    >
                      <span className="material-icons">cake</span>
                      <div className="userData_container">
                        <h5 className="title-birthdate">Birthdate</h5>
                        <span className="text-birthdate text-white">
                          {user_item.birthDate}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`user-data__main-section d-flex ${
                        user_item.gender === "" ? "hide_section" : ""
                      }`}
                    >
                      <span className="material-icons">
                        {user_item.gender === "female"
                          ? "female"
                          : user_item.gender === "male"
                          ? "male"
                          : ""}
                      </span>
                      <div className="userData_container">
                        <h5 className="title-gender">Gender</h5>
                        <span className="text-gender">{user_item.gender}</span>
                      </div>
                    </div>

                    <div
                      className={`user-data__main-section d-flex ${
                        user_item.company.name === "" &&
                        user_item.company.title === ""
                          ? "hide_section"
                          : ""
                      }`}
                    >
                      <span className="material-icons">work</span>
                      <div className="userData_container">
                        <h5 className="title-job">Job</h5>
                        <span className="text-job text-white">
                          {`Work at ${user_item.company.name} as a ${user_item.company.title}.`}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/********************************************/}
            </section>
          </div>
          {edit_method_activated ? (
            <Edit_contact_info
              closeWindowEdit={closeWindow}
              userData={user_item}
              update_userData={updateUserData}
              edit_methodActivated={edit_method_activated}
            />
          ) : image_update_preview ? (
            <Update_image
              file_profilePhoto={file_profilePhoto}
              userItem={user_item}
              close_updateImage={close_updateImage_window}
              update_profilePicture={updateProfilePicture}
              update_fullImage_handler={update_full_image_handler}
            />
          ) : coverPhoto_update_preview ? (
            <Update_coverPhoto
              file_coverPhoto={file_coverPhoto}
              userItem={user_item}
              object_new_coverPhoto={newCoverPhoto}
              close_update_coverPhoto={close_update_cover_photo_window}
              update_coverPhoto={update_cover_photo}
              update_full_coverPhoto_handler={update_full_cover_photo_handler}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default User_profile;
