import React, { useState, useContext } from "react";
import Avatar from "react-avatar-edit";

import { AppContext } from "../context/MyProvider";

const UploadAvatar = (props) => {
  const provider = useContext(AppContext);

  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
    props.update_profile_avatar(view);
  };

  return (
    <div className="uploadAvatar_mainContainer">
      <Avatar
        width={608}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={provider.object_newImage.url_photo}
        exportQuality={1}
        minCropRadius={0}
        backgroundColor="black"
      />
      {preview && (
        <div
          className="preview_image_container d-flex align-items-center justify-content-center flex-column p-3"
          style={{
            width: "100%",
            padding: "0.5rem 0 0.5rem 0",
          }}
        >
          <span
            className="previewing-title"
            style={{
              color: "#fff",
              fontSize: "1.4rem",
              fontWeight: 600,
              letterSpacing: "0.01rem",
              marginBottom: "0.3rem",
              position: "relative",
              bottom: "0.2rem",
            }}
          >
            Previewing
          </span>
          <img
            src={preview}
            alt=""
            style={{
              width: "9rem",
              position: "relative",
              bottom: "0.25rem",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
