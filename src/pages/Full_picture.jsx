import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { nanoid } from "nanoid";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

import default_profilePhoto_man from "../img/ghost_perfil_man.jpg";
import default_profilePhoto_woman from "../img/ghost_perfil_woman.jpg";

const Full_picture = () => {
  const navigate = useNavigate();

  const user_id = sessionStorage.getItem("user_id");
  const searched_user_id = sessionStorage.getItem("searched_user_id");

  const active_change_user = JSON.parse(
    sessionStorage.getItem("active_change_user")
  );

  const [active_write_msg, setActive_write_msg] = useState(true);
  const [comment, setComment] = useState("");

  let [user_doc, setUser_doc] = useState("");
  let [array_user_comment, setArray_user_comment] = useState([]);
  let [activate_moreOptions, setActivate_moreOptions] = useState(false);
  const [random_commentId, setRandom_commentId] = useState("");
  let [array_commentObjects, setArray_commentObjects] = useState([]);
  const [obtained_commentObject, setObtained_commentObject] = useState({});
  const [editionMode, setEditionMode] = useState(false);
  let [currentDate_of_comment, setCurrentDate_of_comment] = useState("");
  let [arrayLikes, setArrayLikes] = useState([]);
  let [cant_likes, setCant_likes] = useState(0);
  const [I_like_active, setI_like_active] = useState(null);
  const [show_userLikes, setShow_userLikes] = useState(null);
  let [cantLikes_user, setCantLikes_user] = useState(null);

  const [activate_hideComment, setActivate_hideComment] = useState(false);
  const [captured_commentID, setCaptured_commentID] = useState("");
  const [array_hide_comment, setArray_hide_comment] = useState([]);

  const [activate_showComponent, setActivate_showComponent] = useState(false);

  let [form_info_loggedUser, setForm_info_loggedUser] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );

        const get_userDoc = await getDoc(docRef);

        if (get_userDoc.exists()) {
          setUser_doc((user_doc = get_userDoc.data()));

          setActivate_showComponent(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user_doc]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );

        const get_userDoc = await getDoc(docRef);

        if (get_userDoc.exists()) {
          setArray_user_comment(
            (array_user_comment =
              get_userDoc.data().array_msgObjects_profilePhoto)
          );

          setArrayLikes(
            (arrayLikes = get_userDoc.data().array_likes_profilePhoto)
          );

          setCant_likes((cant_likes = arrayLikes.length));
          setCantLikes_user((cantLikes_user = arrayLikes.length));

          arrayLikes.forEach((item) => {
            if (item.like_user_id === user_id) {
              setI_like_active(true);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [I_like_active]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", active_change_user ? user_id : user_id);

        const get_userDoc = await getDoc(docRef);

        if (get_userDoc.exists()) {
          setForm_info_loggedUser((form_info_loggedUser = get_userDoc.data()));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const close_window_full_picture = () => {
    sessionStorage.setItem("show_fullPicture", JSON.stringify(false));
    navigate("/user-profile");

    setTimeout(() => {
      setActivate_showComponent(false);
    }, 500);
  };

  const handle_return_profile = () => {
    setTimeout(() => {
      sessionStorage.setItem("show_fullPicture", JSON.stringify(false));
      navigate("/user-profile");
    }, 500);
  };

  const handle_like_Button = async () => {
    try {
      const object_like = {
        like_user_id: user_id,
        like_fullname: `${form_info_loggedUser.firstName} ${form_info_loggedUser.lastName}`,
      };

      if (!I_like_active) {
        const objectLike_doc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        await updateDoc(objectLike_doc, {
          array_likes_profilePhoto: arrayUnion(object_like),
        });

        const docRef = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        const arrayLikes_doc = await getDoc(docRef);

        if (arrayLikes_doc.exists()) {
          setArrayLikes(arrayLikes_doc.data().array_likes_profilePhoto);
          setI_like_active(true);

          setCant_likes((cant_likes = cant_likes + 1));
          setCantLikes_user((cantLikes_user = arrayLikes.length));
        }
      } else {
        const userDoc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );

        await updateDoc(userDoc, {
          array_likes_profilePhoto: arrayRemove(object_like),
        });

        const updated_userDoc = doc(
          db,
          "users",
          active_change_user ? searched_user_id : user_id
        );
        const get_userData = await getDoc(updated_userDoc);

        if (get_userData.exists()) {
          setArrayLikes(get_userData.data().array_likes_profilePhoto);
          setI_like_active(false);

          if (cant_likes > 0) {
            setCant_likes((cant_likes = cant_likes - 1));
            setCantLikes_user((cantLikes_user = arrayLikes.length));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle_comment = (e) => {
    setComment(e.target.value);
  };

  const handle_add_array_commentObject = async (e) => {
    e.preventDefault();

    try {
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
          setCurrentDate_of_comment(
            (currentDate_of_comment = `${month}, ${current_day}`)
          );
        }
      });

      const objectComment = {
        comment_id: nanoid(10),
        logged_userID: user_id,
        user_fullName: `${form_info_loggedUser.firstName} ${form_info_loggedUser.lastName}`,
        user_gender: form_info_loggedUser.gender,
        user_profilePhoto: form_info_loggedUser.image,
        user_comment: {
          comment: comment,
          currentDate_comment: currentDate_of_comment,
        },
      };

      const newComment = doc(
        db,
        "users",
        active_change_user ? searched_user_id : user_id
      );
      await updateDoc(newComment, {
        array_msgObjects_profilePhoto: arrayUnion(objectComment),
      });

      const docRef = doc(
        db,
        "users",
        active_change_user ? searched_user_id : user_id
      );
      const comment_doc = await getDoc(docRef);

      if (comment_doc.exists()) {
        setArray_user_comment(
          (array_user_comment =
            comment_doc.data().array_msgObjects_profilePhoto)
        );

        console.log(comment);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle_cancel_comment = () => {
    setEditionMode(false);
    setComment("");
  };

  const handle_moreOptions_comment = (comment_id) => {
    setRandom_commentId(comment_id);
    setActivate_moreOptions((activate_moreOptions = !activate_moreOptions));
  };

  const handle_delete_array_commentObject = async (captured_commentObject) => {
    try {
      const userDoc = doc(
        db,
        "users",
        active_change_user ? searched_user_id : user_id
      );

      await updateDoc(userDoc, {
        array_msgObjects_profilePhoto: arrayRemove(captured_commentObject),
      });

      const updated_userDoc = doc(
        db,
        "users",
        active_change_user ? searched_user_id : user_id
      );
      const get_userData = await getDoc(updated_userDoc);

      if (get_userData.exists()) {
        setArray_commentObjects(
          (array_commentObjects =
            get_userData.data().array_msgObjects_profilePhoto)
        );

        const arrayFilter = array_commentObjects.filter(
          (user) => user.comment_id !== captured_commentObject.comment_id
        );
        setArray_user_comment((array_user_comment = arrayFilter));

        setEditionMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const edit_commentObject = (captured_commentObject) => {
    setEditionMode(true);
    setActivate_moreOptions(false);
    setActive_write_msg(true);
    setObtained_commentObject(captured_commentObject);
    setComment(captured_commentObject.user_comment.comment);
  };

  const handle_edit_array_commentObject = async (e) => {
    e.preventDefault();
    try {
      const edited_commentArray = array_user_comment.map((doc) =>
        doc.comment_id === obtained_commentObject.comment_id
          ? {
              comment_id: obtained_commentObject.comment_id,
              logged_userID: user_id,
              user_fullName: obtained_commentObject.user_fullName,
              user_gender: obtained_commentObject.user_gender,
              user_profilePhoto: obtained_commentObject.user_profilePhoto,

              user_comment: {
                comment: comment,
                currentDate_comment: currentDate_of_comment,
              },
            }
          : doc
      );

      const userDoc = doc(
        db,
        "users",
        active_change_user ? searched_user_id : user_id
      );

      await updateDoc(userDoc, {
        array_msgObjects_profilePhoto: edited_commentArray,
      });

      setArray_user_comment(edited_commentArray);

      setComment("");
      setEditionMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_hide_comment = (user) => {
    let array_hideComment = [];

    array_user_comment.forEach((comm) => {
      if (comm.comment_id === user.comment_id) {
        array_hideComment.push({
          comm_fullName: comm.user_fullName,
          comm_id: comm.comment_id,
        });

        setArray_hide_comment(array_hideComment);

        setActivate_hideComment(!false);
        setCaptured_commentID(comm.comment_id);
      }
    });
  };

  return (
    <>
      {activate_showComponent && (
        <div
          className="full-picture_mainContainer"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgb(0, 0, 0)",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          <button
            className="material-icons close_icon"
            onClick={() => close_window_full_picture()}
          >
            close
          </button>
          <div className="container_image-comments">
            <section className="full-image_container">
              <img
                loading="lazy"
                src={user_doc.full_image}
                className="full_image"
                alt=""
              />
            </section>

            <section className="comments_container">
              <div className="image-firstName-lastName__container">
                <div className="profile-image_container">
                  <button
                    className="mx-2"
                    onClick={() => handle_return_profile()}
                  >
                    <img
                      loading="lazy"
                      src={
                        user_doc.image.url_photo === "" &&
                        user_doc.gender === "male"
                          ? default_profilePhoto_man
                          : user_doc.image.url_photo === "" &&
                            user_doc.gender === "female"
                          ? default_profilePhoto_woman
                          : user_doc.image.url_photo
                      }
                      style={{
                        width: "2.4rem",
                        height: "2.4rem",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                  </button>
                </div>
                <div className="fullname-currentDate__container">
                  <button onClick={() => handle_return_profile()}>
                    <h3 className="user-fullname_text">
                      {`${user_doc.firstName} ${user_doc.lastName}`}
                    </h3>
                  </button>

                  <span className="text-current_date">
                    {user_doc.image.currentDate}
                  </span>
                </div>
              </div>
              <div className="reactions_msgs-box__content">
                <div className="cant-likes_maincontainer">
                  <div className="icon-cantLikes_content">
                    <span
                      className="material-icons icon-like"
                      onMouseOver={() => setShow_userLikes(true)}
                      onMouseOut={() => setShow_userLikes(false)}
                    >
                      thumb_up_alt
                    </span>
                    <span className="text-cantLikes">{cant_likes}</span>
                  </div>
                  {show_userLikes && cantLikes_user !== 0 && (
                    <div className="fullname-userLikes_container">
                      <span className="title_I-like">I like</span>
                      {arrayLikes.map((user) => (
                        <span
                          className="text_like-fullname"
                          key={user.like_user_id}
                        >
                          {user.like_fullname}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="reactions-container">
                  <button
                    className="like-button"
                    onClick={() => handle_like_Button()}
                  >
                    <span
                      className={`material-icons like-icon ${
                        I_like_active ? "change-color_button" : ""
                      }`}
                    >
                      {I_like_active ? "thumb_up_alt " : "thumb_up_off_alt"}
                    </span>
                    <span
                      className={`text-like ${
                        I_like_active ? "change-color_text" : ""
                      }`}
                    >
                      Like
                    </span>
                  </button>
                  <button className="comment-button">
                    <span className="material-icons comment-icon">
                      chat_bubble_outline
                    </span>
                    <span className="text-comment">Comment</span>
                  </button>
                </div>
              </div>
              <div className="main-container_sectionComments-boxMSG">
                <div
                  id="comments_main-container"
                  className={`comments_main-container ${
                    array_user_comment.length >= 3 && "enable_scroll-y"
                  }`}
                >
                  <table className="rendered-comment__container">
                    <tbody>
                      {array_user_comment.map((user) => (
                        <tr
                          className="d-flex align-items-center"
                          key={user.comment_id}
                        >
                          <td
                            className={`profilePhoto-comment_content mt-2 ${
                              user.comment_id === captured_commentID &&
                              activate_hideComment &&
                              "hideComment"
                            }`}
                          >
                            <button className="smallProfilePicture_comment">
                              <img
                                loading="lazy"
                                src={
                                  user.user_profilePhoto.url_photo === "" &&
                                  user.user_gender === "male"
                                    ? default_profilePhoto_man
                                    : user.user_profilePhoto.url_photo === "" &&
                                      user.user_gender === "female"
                                    ? default_profilePhoto_woman
                                    : user.user_profilePhoto.url_photo
                                }
                                alt=""
                              />
                            </button>
                            <div className="fullname-msg_content">
                              <div className="fullname-comment__container">
                                <span className="fullname-content">
                                  {user.user_fullName}
                                </span>
                                <span className="comment-content">
                                  {user.user_comment.comment}
                                </span>
                              </div>
                              <div className="showComment-currentDate__container">
                                <span className="bottomText-comment_currentDate">
                                  {user.user_comment.currentDate_comment}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td
                            className="icon-moreOptions_container"
                            onClick={() =>
                              handle_moreOptions_comment(user.comment_id)
                            }
                          >
                            <div className="optionsButton-moreOptionsComment__container">
                              <button className="material-icons icon-moreOptions">
                                more_horiz
                              </button>
                              {user.comment_id === random_commentId &&
                                activate_moreOptions && (
                                  <div
                                    className="more_options__container d-flex flex-column"
                                    key={user.comment_id}
                                  >
                                    <div className="buttons-moreOptions_container">
                                      {!active_change_user ||
                                      (active_change_user &&
                                        user.logged_userID === user_id) ? (
                                        <button
                                          className="deteleButton_comment"
                                          onClick={() =>
                                            handle_delete_array_commentObject(
                                              user
                                            )
                                          }
                                        >
                                          <span className="material-icons">
                                            delete
                                          </span>
                                          Delete comment
                                        </button>
                                      ) : user.logged_userID ===
                                          searched_user_id ||
                                        user.logged_userID !== user_id ? (
                                        activate_hideComment ? (
                                          <button
                                            className="hideButton_comment"
                                            onClick={() =>
                                              setActivate_hideComment(false)
                                            }
                                          >
                                            <span className="material-icons">
                                              comment
                                            </span>{" "}
                                            Show comment
                                          </button>
                                        ) : (
                                          <button
                                            className="hideButton_comment"
                                            onClick={() =>
                                              handle_hide_comment(user)
                                            }
                                          >
                                            <span className="material-icons">
                                              comments_disabled
                                            </span>{" "}
                                            Hide comment
                                          </button>
                                        )
                                      ) : null}

                                      {user.logged_userID === user_id && (
                                        <button
                                          className="editButton_comment mt-1"
                                          onClick={() =>
                                            edit_commentObject(user)
                                          }
                                        >
                                          <span className="material-icons">
                                            edit
                                          </span>
                                          Edit comment
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="msgs-box_container">
                {active_write_msg && (
                  <form
                    onSubmit={
                      editionMode
                        ? handle_edit_array_commentObject
                        : handle_add_array_commentObject
                    }
                    className="form_image-input__container"
                  >
                    <button className="small_profile_photo">
                      <img
                        loading="lazy"
                        src={
                          form_info_loggedUser.image.url_photo === "" &&
                          form_info_loggedUser.gender === "male"
                            ? default_profilePhoto_man
                            : form_info_loggedUser.image.url_photo === "" &&
                              form_info_loggedUser.gender === "female"
                            ? default_profilePhoto_woman
                            : form_info_loggedUser.image.url_photo
                        }
                        alt=""
                      />
                    </button>
                    <div className="form-buttons__container">
                      <textarea
                        id="input-comment"
                        row="100"
                        cols="70"
                        size="400"
                        maxLength="400"
                        placeholder="Write a comment..."
                        onChange={(e) => handle_comment(e)}
                        value={comment}
                        autoFocus={comment === "" ? true : false}
                      />
                      <div className="comment-buttons_container">
                        {editionMode ? (
                          <div className="edit-close-buttons_container">
                            <button
                              className="material-icons cancel-button_msg"
                              onClick={() => handle_cancel_comment()}
                            >
                              close
                            </button>
                            {comment !== "" && (
                              <button
                                className="material-icons edit-button_msg"
                                type="submit"
                              >
                                edit
                              </button>
                            )}
                          </div>
                        ) : (
                          comment !== "" && (
                            <button
                              className="material-icons save-button_msg"
                              type="submit"
                            >
                              save
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Full_picture;
