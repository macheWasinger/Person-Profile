import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/MyProvider";
import { useNavigate } from "react-router-dom";

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import logo_PP from "../video/logo_PP_login_1.mp4";
import Loading from "../components/Loading";

const UserRegister = () => {
  const provider = useContext(AppContext);
  let navigate = useNavigate();

  const [register_firstName, setRegister_firstName] = useState("");
  const [register_lastName, setRegister_lastName] = useState("");
  const [register_gender, setRegister_gender] = useState("");
  const [register_email, setRegister_email] = useState("");
  const [register_username, setRegister_username] = useState("");
  const [register_birthdate, setRegister_birthdate] = useState("");
  const [register_password, setRegister_password] = useState("");
  const [register_confirm_password, setRegister_confirm_password] =
    useState("");

  const [activate_password_viewer, setActivate_password_viewer] =
    useState(false);

  const [
    activate_confirm_password_viewer,
    setActivate_confirm_password_viewer,
  ] = useState(false);
  const [error_message, setError_message] = useState("");
  const [active_loading, setActive_loading] = useState(false);
  const [activate_changeColor_input, setActivate_changeColor_input] =
    useState(-1);
  const [active_input, setActive_input] = useState(-1);

  useEffect(() => {
    setActive_input(0);
  }, []);

  const user_register_handler = (e) => {
    e.preventDefault();

    if (!register_firstName.trim()) {
      setError_message("Enter a firstName!...");
      return;
    }

    if (!register_lastName.trim()) {
      setError_message("Enter a lastName...");
      return;
    }
    if (!register_email.trim()) {
      setError_message("Enter a Email!...");
      return;
    }

    if (!register_username.trim()) {
      setError_message("Enter a userName!...");
      return;
    }
    if (!register_password.trim()) {
      setError_message("Enter a password!...");
      return;
    }

    if (!register_confirm_password.trim()) {
      setError_message("Confirm password!...");
      return;
    }

    if (register_password === register_confirm_password) {
      const add_newUser = async () => {
        try {
          let object_user = {
            firstName: register_firstName,
            lastName: register_lastName,
            nickName: "",
            phone: "",
            username: register_username,
            password: register_password,
            email: register_email,
            address: {
              city: "",
              country: "",
              province: "",
            },
            birthDate: register_birthdate,
            image: {
              url_photo: "",
              currentDate: "",
            },
            full_image: "",
            cover_photo: {
              url_coverPhoto: "",
              currentDate: "",
            },
            full_cover_photo: "",
            gender: register_gender,
            company: {
              name: "",
              title: "",
            },
            array_likes_profilePhoto: [],
            array_likes_coverPhoto: [],
            array_msgObjects_profilePhoto: [],
            array_msgObjects_coverPhoto: [],
          };

          const newUser = doc(collection(db, "users"));

          await setDoc(newUser, object_user);

          setError_message("");
          setActive_loading(!false);

          setTimeout(() => {
            setRegister_firstName("");
            setRegister_lastName("");
            setRegister_gender("");
            setRegister_email("");
            setRegister_username("");
            setRegister_password("");
            setRegister_confirm_password("");
          }, 1800);

          setTimeout(() => {
            setActive_loading(false);
            provider.setActive_userRegister(false);

            navigate("/login");
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      };
      add_newUser();
    } else {
      setError_message("Error: The passwords are different!");
    }
  };

  const clear_input_register_register_firstName = () => {
    setRegister_firstName("");
  };

  const clear_input_register_register_lastName = () => {
    setRegister_lastName("");
  };

  const clear_input_register_register_email = () => {
    setRegister_email("");
  };

  const clear_input_register_username = () => {
    setRegister_username("");
  };

  const close_window_userRegister = () => {
    sessionStorage.setItem("show_registerUser", JSON.stringify(false));

    navigate("/login");
  };

  return (
    <div className="userRegister_container">
      <div
        className="video-formRegister_container d-flex justify-content-between align-items-center"
        style={{
          width: "48rem",
          height: "100vh",
          backgroundColor: "#F0F2F5",
          margin: "auto",
        }}
      >
        <section className="logoPP-text-subtitle_userRegister mb-5">
          <video
            loading="lazy"
            autoPlay
            loop
            muted
            className="logoPP__style_userRegister"
            src={logo_PP}
          ></video>
          <h3 className="title-welcome">Welcome!...</h3>
          <p className="subtitle-register">
            Register and log in to enjoy the best experience.
          </p>
        </section>
        <section className="register_form-container p-3 d-flex justify-content-center align-items-center flex-column">
          <div className="titleRegister-closeButton__container">
            <h1 className="title-userRegister">User register</h1>

            <button
              className="material-icons close-button"
              onClick={() => close_window_userRegister()}
            >
              close
            </button>
          </div>
          <p className="userRegister_subtitle">It's fast and easy!</p>
          <form
            action=""
            className="form_userRegister"
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              className={`register_input-firstname_container ${
                activate_changeColor_input === 0 || active_input === 0
                  ? "changeColor_input"
                  : active_input === 1 && "disable_changeColor_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(0);
                setActive_input(-1);
              }}
            >
              <input
                type="text"
                id="register_firstname"
                size="30"
                maxLength="30"
                placeholder="First name"
                onChange={(e) => setRegister_firstName(e.target.value)}
                value={register_firstName}
                autoFocus={register_firstName === "" ? true : false}
                onSelect={() => setActive_input(0)}
              />
              {register_firstName.length > 0 ? (
                <span
                  className="material-icons icon-close"
                  onClick={() => clear_input_register_register_firstName()}
                >
                  close
                </span>
              ) : null}
            </div>

            <div
              className={`register_input-lastname_container ${
                (activate_changeColor_input === 1 || active_input === 1) &&
                "change_color_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(1);
                setActive_input(-1);
              }}
            >
              <input
                type="text"
                id="register_lastname"
                size="30"
                maxLength="30"
                placeholder="Last name"
                onChange={(e) => setRegister_lastName(e.target.value)}
                value={register_lastName}
                onSelect={() => {
                  setActive_input(1);
                  setActivate_changeColor_input(-1);
                }}
              />
              {register_lastName.length > 0 ? (
                <span
                  className="material-icons icon-close"
                  onClick={() => clear_input_register_register_lastName()}
                >
                  close
                </span>
              ) : null}
            </div>

            <div
              className={`register_input-email_container mt-2 ${
                (activate_changeColor_input === 2 || active_input === 2) &&
                "change_color_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(2);
                setActive_input(-1);
              }}
            >
              <input
                type="email"
                id="register_email"
                size="30"
                maxLength="30"
                placeholder="Email"
                onChange={(e) => setRegister_email(e.target.value)}
                value={register_email}
                onSelect={() => {
                  setActive_input(2);
                  setActivate_changeColor_input(-1);
                }}
              />
              {register_email.length > 0 ? (
                <span
                  className="material-icons icon-close"
                  onClick={() => clear_input_register_register_email()}
                >
                  close
                </span>
              ) : null}
            </div>

            <div
              className={`register_input-username_container mt-2 ${
                (activate_changeColor_input === 3 || active_input === 3) &&
                "change_color_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(3);
                setActive_input(-1);
              }}
            >
              <input
                type="text"
                id="register_user_name"
                size="30"
                maxLength="30"
                placeholder="Username"
                onChange={(e) => setRegister_username(e.target.value)}
                value={register_username}
                onSelect={() => {
                  setActive_input(3);
                  setActivate_changeColor_input(-1);
                }}
              />
              {register_username.length > 0 ? (
                <span
                  className="material-icons icon-close"
                  onClick={() => clear_input_register_username()}
                >
                  close
                </span>
              ) : null}
            </div>

            <div
              className={`register_input-password_container mt-2 ${
                (activate_changeColor_input === 4 || active_input === 4) &&
                "change_color_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(4);
                setActive_input(-1);
              }}
            >
              <input
                type={activate_password_viewer ? "text" : "password"}
                id="register_user_password"
                size="100"
                maxLength="100"
                placeholder="Password"
                onChange={(e) => setRegister_password(e.target.value)}
                value={register_password}
                onSelect={() => {
                  setActive_input(4);
                  setActivate_changeColor_input(-1);
                }}
              />
              {register_password.length > 0 ? (
                <span
                  className="material-icons icon-viewer"
                  onClick={() =>
                    setActivate_password_viewer(!activate_password_viewer)
                  }
                >
                  {activate_password_viewer ? "visibility" : "visibility_off"}
                </span>
              ) : null}
            </div>

            <div
              className={`register_input_confirm-password_container mt-2 ${
                (activate_changeColor_input === 5 || active_input === 5) &&
                "change_color_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(5);
                setActive_input(-1);
              }}
            >
              <input
                type={activate_confirm_password_viewer ? "text" : "password"}
                id="register_user_confirm-password"
                size="100"
                maxLength="100"
                placeholder="Confirm Password"
                onChange={(e) => setRegister_confirm_password(e.target.value)}
                value={register_confirm_password}
                onSelect={() => {
                  setActive_input(5);
                  setActivate_changeColor_input(-1);
                }}
              />
              {register_confirm_password.length > 0 ? (
                <span
                  className="material-icons icon-viewer"
                  onClick={() =>
                    setActivate_confirm_password_viewer(
                      !activate_confirm_password_viewer
                    )
                  }
                >
                  {activate_confirm_password_viewer
                    ? "visibility"
                    : "visibility_off"}
                </span>
              ) : null}
            </div>
            <div
              className={`register_input-birthdate_container mt-2 ${
                (activate_changeColor_input === 6 || active_input === 6) &&
                "change_color_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(6);
                setActive_input(-1);
              }}
            >
              <input
                type="date"
                id="input-birthdate"
                className="birthdate-input"
                onChange={(e) => setRegister_birthdate(e.target.value)}
                value={register_birthdate}
                onSelect={() => {
                  setActive_input(6);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>

            <div
              className={`register_radio-input__container mt-2 ${
                (activate_changeColor_input === 7 || active_input === 7) &&
                "changeColor_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(7);
                setActive_input(-1);
              }}
            >
              <div className="female-container">
                <span>Female</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => setRegister_gender(e.target.value)}
                  onSelect={() => {
                    setActive_input(7);
                    setActivate_changeColor_input(-1);
                  }}
                />
              </div>
              <div className="male-container">
                <span>Male</span>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) => setRegister_gender(e.target.value)}
                  onSelect={() => {
                    setActive_input(8);
                    setActivate_changeColor_input(-1);
                  }}
                />
              </div>
            </div>

            {error_message ? (
              <span
                className="text-danger alert alert-danger mt-2"
                style={{
                  height: "4vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {error_message}
              </span>
            ) : active_loading ? (
              <Loading />
            ) : (
              ""
            )}

            <p className="text-privacy">
              By clicking "Register", you agree to our Terms, Privacy Policy and
              Cookie Policy.
            </p>

            <button
              className="userRegister_button mt-2"
              onClick={(e) => user_register_handler(e)}
            >
              Register
            </button>
          </form>
        </section>
      </div>

      <footer>© 2023 Created by Marcelo Adrián Wasinger</footer>
    </div>
  );
};

export default UserRegister;
