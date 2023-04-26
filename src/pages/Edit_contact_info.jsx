import React, { useState, useContext } from "react";
import { AppContext } from "../context/MyProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Edit_contact_info = (props) => {
  const provider = useContext(AppContext);
  let user_data = props.userData;
  let userID = sessionStorage.getItem("user_id");
  const [user_firstname, setUser_firstname] = useState(user_data.firstName);
  const [user_lastname, setUser_lastname] = useState(user_data.lastName);
  const [user_nickName, setUser_nickName] = useState(user_data.nickName);
  const [user_phone, setUser_phone] = useState(user_data.phone);
  const [user_email, setUser_email] = useState(user_data.email);
  const [user_province, setUser_province] = useState(
    user_data.address.province
  );
  const [user_city, setUser_city] = useState(user_data.address.city);
  const [user_country, setUser_country] = useState(user_data.address.country);
  const [user_birthdate, setUser_birthdate] = useState(user_data.birthDate);
  const [user_gender, setUser_gender] = useState(user_data.gender);
  const [user_workName, setUser_workName] = useState(user_data.company.name);
  const [user_workTitle, setUser_workTitle] = useState(user_data.company.title);

  /*************** UPDATE STATES ***************/

  const [activate_changeColor_input, setActivate_changeColor_input] =
    useState(-1);
  const [active_input, setActive_input] = useState(-1);

  const close_window_edit_info = () => {
    props.closeWindowEdit(false);
    provider.setActivate_smallPicture(false);
  };

  const save_updated_userData = async () => {
    try {
      const edited_user = doc(db, "users", userID);
      await updateDoc(edited_user, {
        firstName: user_firstname,
        lastName: user_lastname,
        nickName: user_nickName,
        phone: user_phone,
        email: user_email,
        address: {
          city: user_city,
          country: user_country,
          province: user_province,
        },
        birthDate: user_birthdate,
        gender: user_gender.toLowerCase(),
        company: {
          name: user_workName,
          title: user_workTitle,
        },
      });

      let update_data = {
        id: userID,
        firstName: user_firstname,
        lastName: user_lastname,
        nickName: user_nickName,
        phone: user_phone,
        email: user_email,
        address: {
          city: user_city,
          country: user_country,
          province: user_province,
        },
        birthDate: user_birthdate,
        image: user_data.image,
        cover_photo: user_data.cover_photo,
        gender: user_gender,
        company: {
          name: user_workName,
          title: user_workTitle,
        },
      };
      props.update_userData(update_data);

      props.closeWindowEdit(false);
      provider.setActivate_smallPicture(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-contact-info__container">
      <div className="edit-info__content">
        <section className="title-edit_close-icon__container">
          <h3 className="title-edit-info">Edit contact information</h3>
          <button
            className="material-icons text-close-edit"
            onClick={() => close_window_edit_info()}
          >
            close
          </button>
        </section>

        <section className="main-container_inputs">
          <div className="user-inputs_container">
            <div
              className={`firstname-lastname-nickname_inputs ${
                activate_changeColor_input === 0 || active_input === 0
                  ? "change_borderColor"
                  : active_input === 1 && "disable_changeColor_input"
              }`}
              onClick={() => {
                setActivate_changeColor_input(0);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-firstName ${
                  (activate_changeColor_input === 0 || active_input === 0) &&
                  "change_titleColor"
                }`}
              >
                First name
              </p>
              <input
                type="text"
                id="input-firstname"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_firstname(e.target.value)}
                value={user_firstname}
                onSelect={() => {
                  setActive_input(0);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`firstname-lastname-nickname_inputs lastname-container ${
                (activate_changeColor_input === 1 || active_input === 1) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(1);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-lastName ${
                  (activate_changeColor_input === 1 || active_input === 1) &&
                  "change_titleColor"
                }`}
              >
                Last name
              </p>
              <input
                type="text"
                id="input-lastname"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_lastname(e.target.value)}
                value={user_lastname}
                onSelect={() => {
                  setActive_input(1);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`firstname-lastname-nickname_inputs nickname-container ${
                (activate_changeColor_input === 2 || active_input === 2) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(2);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-lastName ${
                  (activate_changeColor_input === 2 || active_input === 2) &&
                  "change_titleColor"
                }`}
              >
                Nicknanme
              </p>
              <input
                type="text"
                id="input-nickname"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_nickName(e.target.value)}
                value={user_nickName}
                onSelect={() => {
                  setActive_input(2);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>

            <div
              className={`inputs-container mt-3 ${
                (activate_changeColor_input === 3 || active_input === 3) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(3);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-phone ${
                  (activate_changeColor_input === 3 || active_input === 3) &&
                  "change_titleColor"
                }`}
              >
                Phone
              </p>
              <input
                type="text"
                id="input-phone"
                size="30"
                maxLength="30"
                onChange={(e) => setUser_phone(e.target.value)}
                value={user_phone}
                onSelect={() => {
                  setActive_input(3);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`inputs-container mt-3 ${
                (activate_changeColor_input === 4 || active_input === 4) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(4);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-email ${
                  (activate_changeColor_input === 4 || active_input === 4) &&
                  "change_titleColor"
                }`}
              >
                Email
              </p>
              <input
                type="text"
                id="input-email"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_email(e.target.value)}
                value={user_email}
                onSelect={() => {
                  setActive_input(4);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>

            <div
              className={`inputs-container mt-3 ${
                (activate_changeColor_input === 5 || active_input === 5) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(5);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-birthdate ${
                  (activate_changeColor_input === 5 || active_input === 5) &&
                  "change_titleColor"
                }`}
              >
                Birthdate
              </p>
              <input
                type="date"
                id="input-birthdate"
                className="birthdate-input"
                onChange={(e) => setUser_birthdate(e.target.value)}
                value={user_birthdate}
                onSelect={() => {
                  setActive_input(5);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`inputs-container inputs-gender_radio mt-3 ${
                (activate_changeColor_input === 6 || active_input === 6) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(6);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-gender ${
                  (activate_changeColor_input === 6 || active_input === 6) &&
                  "change_titleColor"
                }`}
              >
                Gender
              </p>
              <div className="radio-input__container">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={user_gender === "female" ? true : false}
                    onChange={(e) => setUser_gender(e.target.value)}
                    onSelect={() => {
                      setActive_input(6);
                      setActivate_changeColor_input(-1);
                    }}
                  />
                  <span>F</span>
                </div>
                <div className="mx-4">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={user_gender === "male" ? true : false}
                    onChange={(e) => setUser_gender(e.target.value)}
                    onSelect={() => {
                      setActive_input(7);
                      setActivate_changeColor_input(-1);
                    }}
                  />
                  <span>M</span>
                </div>
              </div>
            </div>

            <div
              className={`address_inputs-container mt-3 ${
                (activate_changeColor_input === 8 || active_input === 8) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(8);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-city ${
                  (activate_changeColor_input === 8 || active_input === 8) &&
                  "change_titleColor"
                }`}
              >
                City
              </p>
              <input
                type="text"
                id="input-city"
                size="40"
                maxLength="40"
                onChange={(e) => setUser_city(e.target.value)}
                value={user_city}
                onSelect={() => {
                  setActive_input(8);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`address_inputs-container mt-3 ${
                (activate_changeColor_input === 9 || active_input === 9) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(9);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-province ${
                  (activate_changeColor_input === 9 || active_input === 9) &&
                  "change_titleColor"
                }`}
              >
                Province
              </p>
              <input
                type="text"
                id="input-province"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_province(e.target.value)}
                value={user_province}
                onSelect={() => {
                  setActive_input(9);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`address_inputs-container mt-3 ${
                (activate_changeColor_input === 10 || active_input === 10) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(10);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-country ${
                  (activate_changeColor_input === 10 || active_input === 10) &&
                  "change_titleColor"
                }`}
              >
                Country
              </p>
              <input
                type="text"
                id="input-state"
                size="40"
                maxLength="40"
                onChange={(e) => setUser_country(e.target.value)}
                value={user_country}
                onSelect={() => {
                  setActive_input(10);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>

            <div
              className={`inputs-container mt-3 ${
                (activate_changeColor_input === 11 || active_input === 11) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(11);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-workName ${
                  (activate_changeColor_input === 11 || active_input === 11) &&
                  "change_titleColor"
                }`}
              >
                Work name
              </p>
              <input
                type="text"
                id="input-workName"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_workName(e.target.value)}
                value={user_workName}
                onSelect={() => {
                  setActive_input(11);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
            <div
              className={`inputs-container mt-3 ${
                (activate_changeColor_input === 12 || active_input === 12) &&
                "change_borderColor"
              }`}
              onClick={() => {
                setActivate_changeColor_input(12);
                setActive_input(-1);
              }}
            >
              <p
                className={`title-workTitle ${
                  (activate_changeColor_input === 12 || active_input === 12) &&
                  "change_titleColor"
                }`}
              >
                Work title
              </p>
              <input
                type="text"
                id="input-workTitle"
                size="50"
                maxLength="50"
                onChange={(e) => setUser_workTitle(e.target.value)}
                value={user_workTitle}
                onSelect={() => {
                  setActive_input(12);
                  setActivate_changeColor_input(-1);
                }}
              />
            </div>
          </div>
        </section>

        <button
          className="material-icons save-button"
          onClick={() => save_updated_userData()}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Edit_contact_info;
