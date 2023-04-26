import React, { useState, useContext } from "react";
import "react-image-crop/dist/ReactCrop.css";

import { AppContext } from "../context/MyProvider";

import UploadAvatar from "./UploadAvatar";

import { firebaseApp } from "../firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage(firebaseApp);

const Update_image = (props) => {
  const provider = useContext(AppContext);

  const [profileAvatar, setProfileAvatar] = useState(null);

  const userID = sessionStorage.getItem("user_id");

  const disable_blur_effect_updateImage = props.disable_blurEffect_updateImage;

  const close_updateImage_window_handler = async () => {
    const desertRef = ref(
      storage,
      `${props.userItem.firstName} ${props.userItem.lastName}/Profile photo/${props.file_profilePhoto.name}`
    );

    deleteObject(desertRef)
      .then(() => {
        console.log(`*-*-*-*-*-*- DELETED IMAGE CORRECTLY!!`);
      })
      .catch((error) => {
        console.log(`/-/-/-/-/-/- ERROR TO THE DELETE IMAGE!! `, error);
      });

    props.close_updateImage(false);
  };

  const updateProfileAvatar = (e) => {
    setProfileAvatar(e);
  };

  const update_profileImage_handler = async () => {
    try {
      const updated_picture = doc(db, "users", userID);
      await updateDoc(updated_picture, {
        image: {
          url_photo: profileAvatar,
          currentDate: provider.object_newImage.currentDate,
        },
      });

      const docRef = doc(db, "users", userID);
      const user_doc = await getDoc(docRef);

      if (user_doc.exists()) {
        const updated_image = user_doc.data();
        props.update_profilePicture(updated_image.image.url_photo);
        props.update_fullImage_handler(true);
        props.close_updateImage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "grid",
        placeItems: "center",
      }}
      className={`update-image_mainContainer ${
        disable_blur_effect_updateImage ? "disable_blur" : ""
      }`}
    >
      <section className="update-image_container">
        <div className="title-crossButton_container">
          <h1>Update profile picture</h1>
          <button
            className="material-icons"
            onClick={() => close_updateImage_window_handler()}
          >
            close
          </button>
        </div>
        <div className="image-container">
          <UploadAvatar
            profilePicture={provider.object_newImage.url_photo}
            update_profile_avatar={updateProfileAvatar}
          />
        </div>
        <div className="buttonsContainer">
          <button
            className="text-primary cancelButton mx-2"
            onClick={() => close_updateImage_window_handler()}
          >
            Cancel
          </button>
          <button
            className="saveButton"
            onClick={() => update_profileImage_handler()}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default Update_image;
