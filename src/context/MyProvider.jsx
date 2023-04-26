import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export default function MyProvider({ children }) {
  const [activate_smallPicture, setActivate_smallPicture] = useState(false);

  const [active_userRegister, setActive_userRegister] = useState(false);
  let [filtered_user_array, setFiltered_user_array] = useState([]);
  let [active_filtered_user, setActive_filtered_user] = useState(false);
  const [activate_upload_coverPhoto, setActivate_upload_coverPhoto] =
    useState(false);
  const [activate_image_upload, setActivate_image_upload] = useState(false);

  const [activate_iconSearch, setActivate_iconSearch] = useState(false);

  // let [activate_searched_user, setActivate_searched_user] = useState(false);

  let [activate_filter_user, setActivate_filter_user] = useState(false);

  let [object_newImage, setObject_newImage] = useState({});

  return (
    <AppContext.Provider
      value={{
        activate_smallPicture,
        setActivate_smallPicture,
        active_userRegister,
        setActive_userRegister,
        filtered_user_array,
        setFiltered_user_array,
        active_filtered_user,
        setActive_filtered_user,
        activate_upload_coverPhoto,
        setActivate_upload_coverPhoto,
        activate_image_upload,
        setActivate_image_upload,
        activate_iconSearch,
        setActivate_iconSearch,
        activate_filter_user,
        setActivate_filter_user,
        object_newImage,
        setObject_newImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
