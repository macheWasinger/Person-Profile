import "react-image-crop/dist/ReactCrop.css";

import { firebaseApp } from "../firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage(firebaseApp);

const Update_coverPhoto = (props) => {
  const userID = sessionStorage.getItem("user_id");

  const close_updateCoverPhoto_window_handler = async () => {
    const desertRef = ref(
      storage,
      `${props.userItem.firstName} ${props.userItem.lastName}/Cover photo/${props.file_coverPhoto.name}`
    );

    deleteObject(desertRef)
      .then(() => {
        console.log(`*-*-*-*-*-*- DELETED IMAGE CORRECTLY!!`);
      })
      .catch((error) => {
        console.log(`/-/-/-/-/-/- ERROR TO THE DELETE IMAGE!! `, error);
      });

    props.close_update_coverPhoto(false);
  };

  const update_coverPhoto_handler = async () => {
    try {
      const updated_coverPhoto = doc(db, "users", userID);
      await updateDoc(updated_coverPhoto, {
        cover_photo: {
          url_coverPhoto: props.object_new_coverPhoto.url_coverPhoto,
          currentDate: props.object_new_coverPhoto.currentDate,
        },
      });

      const docRef = doc(db, "users", userID);
      const user_doc = await getDoc(docRef);

      if (user_doc.exists()) {
        const updated_cover = user_doc.data();
        props.update_coverPhoto(updated_cover.cover_photo.url_coverPhoto);

        props.update_full_coverPhoto_handler(true);
        props.close_update_coverPhoto(false);
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
      className="update-coverPhoto_mainContainer"
    >
      <section className="update-coverPhoto_container">
        <div className="title-crossButton_container_coverPhoto">
          <h1>Cover image</h1>
          <button
            className="material-icons"
            onClick={() => close_updateCoverPhoto_window_handler()}
          >
            close
          </button>
        </div>
        <div className="image-container_coverPhoto">
          <img
            loading="lazy"
            src={props.object_new_coverPhoto.url_coverPhoto}
            alt=""
          />
        </div>
        <div className="buttonsContainer_coverPhoto">
          <button
            className="text-primary cancelButton_coverPhoto mx-2"
            onClick={() => close_updateCoverPhoto_window_handler()}
          >
            Cancel
          </button>
          <button
            className="saveButton_coverPhoto"
            onClick={() => update_coverPhoto_handler()}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default Update_coverPhoto;
