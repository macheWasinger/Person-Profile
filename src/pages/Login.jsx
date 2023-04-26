import React, { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "../components/Loading";
import logoPP from "../video/logo_PP_login_1.mp4";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error_message, setError_message] = useState("");

  let [active_logged_user, setActive_logged_user] = useState(false);
  const [active_loading, setActive_loading] = useState(false);
  const [activate_password_viewer, setActivate_password_viewer] =
    useState(false);

  const [activate_changeColor_input, setActivate_changeColor_input] =
    useState(-1);

  const [active_input, setActive_input] = useState(-1);

  useEffect(() => {
    const session_actived = JSON.parse(
      sessionStorage.getItem("session_actived")
    );

    if (!session_actived) {
      sessionStorage.removeItem("active_change_user");
    }

    setActive_input(0);
  }, []);

  const get_login_data = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError_message("Enter a username!...");
      return;
    }

    if (!userPassword.trim()) {
      setError_message("Enter a password!...");
      return;
    }

    const user_authentication = async () => {
      try {
        const data_firestore = await getDocs(collection(db, "users"));

        const arrayData = data_firestore.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        arrayData.forEach((item) => {
          ////////////// CONDITIONAL LOGIN //////////////
          if (
            item.username.toLowerCase() === username.toLowerCase() &&
            item.password === userPassword
          ) {
            setActive_logged_user((active_logged_user = !false));

            //Como se cumplió la condición, obtengo los siguientes valores:
            sessionStorage.setItem(
              "session_actived",
              JSON.stringify(active_logged_user)
            );

            sessionStorage.setItem("user_id", item.id);

            sessionStorage.setItem("user_item", JSON.stringify(item));

            setActive_loading(!false);

            setTimeout(() => {
              setUsername("");
              setUserPassword("");
            }, 1800);

            setTimeout(() => {
              navigate("/user-profile");

              setActive_loading(false);
            }, 2000);

            setError_message("");
          } else if (
            (item.username !== username || item.password !== userPassword) &&
            active_logged_user === false
          ) {
            setError_message("Invalid session!...");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    user_authentication();
  };

  const clear_input_username = () => {
    setUsername("");
  };

  const register_handler = () => {
    sessionStorage.setItem("show_registerUser", JSON.stringify(true));

    navigate("/user-register");
  };

  return (
    <div className="login_main-container d-flex justify-content-between align-items-center flex-column">
      <div
        className="video-formLogin_container d-flex justify-content-between align-items-center"
        style={{
          width: "48rem",
          height: "100vh",
          backgroundColor: "#F0F2F5",
          margin: "auto",
        }}
      >
        <section className="logoPP-text-subtitle_login mb-5">
          <video
            loading="lazy"
            autoPlay
            loop
            muted
            className="logoPP__style_login"
            src={logoPP}
          ></video>
          <h3 className="title-welcome">Welcome!...</h3>
          <p className="subtitle-login">
            Log in to see your profile information.
          </p>
        </section>

        <section className="form-container p-3 d-flex justify-content-center align-items-center flex-column">
          <h1 className="mb-3 title-userLogin">User login</h1>
          <div className="icon-person_container d-flex justify-content-center align-items-center mb-3">
            <span className="material-icons person-icon">person</span>
          </div>
          <form
            action=""
            className="form_login"
            style={{
              width: "20rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className={`input-username_container ${
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
                id="user_name"
                size="30"
                maxLength="30"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoFocus={username === "" ? true : false}
                onSelect={() => setActive_input(0)}
              />
              {username.length > 0 ? (
                <span
                  className="material-icons icon-close"
                  onClick={() => clear_input_username()}
                >
                  close
                </span>
              ) : null}
            </div>

            <div
              className={`input-password_container mt-2 ${
                (activate_changeColor_input === 1 || active_input === 1) &&
                "changeColor_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(1);
                setActive_input(-1);
              }}
            >
              <input
                type={activate_password_viewer ? "text" : "password"}
                id="user_password"
                size="100"
                maxLength="100"
                placeholder="Password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
                onSelect={() => {
                  setActive_input(1);
                  setActivate_changeColor_input(-1);
                }}
              />
              {userPassword.length > 0 ? (
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

            <button
              className="login-button_container"
              onClick={(e) => get_login_data(e)}
            >
              Log in
            </button>
          </form>

          <section className="register__main-container mt-3">
            <p className="text-register">Are you not registered yet?</p>
            <button
              className="register_button"
              onClick={() => register_handler()}
            >
              Register
            </button>
          </section>
        </section>
      </div>
      <footer>© 2023 Created by Marcelo Adrián Wasinger</footer>
    </div>
  );
};

export default Login;
