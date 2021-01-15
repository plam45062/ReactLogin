import { React, useState, useEffect } from "react";
import "../style.css";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { withRouter } from "react-router-dom";

function EditUser(props) {

  const id = props.match.params.id;
  useEffect(() => {
    // let id = props.match.params.id;
    getUserById(id);
    console.log(id);
  }, []);
  
  const getUserById = (id) => {
    axios
      .post(`http://103.75.200.45:8088/getuserdetail/${id}`)
      .then((data) => {
        let user = data.data;
        console.log(data);
        setInputEditDataUser({
          id: user.id,
          name: user.name,
          phone: user.phone,
          password: user.password,
          email: user.email,
        });
      })
      .catch((err) => alert(err));
  };
  const { t } = useTranslation();
  let history = useHistory();
  const [inputEditDataUser, setInputEditDataUser] = useState({
    name: "",
    phone:"",
    password: "",
    email: "",
  });
  const [inputFullnameErr, setInputFullnameErr] = useState({});
  const [inputTelErr, setInputTelErr] = useState({});
  const [inputEmailErr1, setInputEmailErr1] = useState({});
  const [inputPasswordErr, setInputPasswordErr] = useState({});

  const handleChange = (e ) => {
    const { target } = e;
    const { name } = target;
    const value = e.target.value;

    setInputEditDataUser({
      ...inputEditDataUser,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      // send
      const EditUser = () => {
        axios
          .post("http://103.75.200.45:8088/edituser", inputEditDataUser)
          .then(d =>{
            console.log(d);
            console.log("EditDataUser isValid",inputEditDataUser)
            history.push('/home')
          })
          .catch(err => alert(err));
        console.log("EditDataUser Fail",inputEditDataUser);
      };
      EditUser(inputEditDataUser);
    }
  };
  const formValidation = () => {
    const inputFullnameErr = {};
    const inputTelErr = {};
    const inputEmailErr1 = {};
    const inputPasswordErr = {};
    let isValid = true;

    if (inputEditDataUser.name.trim().length < 2) {
      inputFullnameErr.inputFullnameErrShort = "Short";
      isValid = false;
    }
    if (inputEditDataUser.phone.trim().length < 9) {
      inputTelErr.inputTelErrShort = "Short";
      isValid = false;
    }
    if (inputEditDataUser.email.trim().length < 5) {
      inputEmailErr1.inputEmailShort = "Short";
      isValid = false;
    }
    if (inputEditDataUser.password.includes("123")) {
      inputPasswordErr.inputPasswordin = "error";
      isValid = false;
    }
    if (inputEditDataUser.password.trim().length < 8) {
      inputPasswordErr.inputPasswordShort = "Password <8 Short";
      isValid = false;
    }
    setInputFullnameErr(inputFullnameErr);
    setInputTelErr(inputTelErr);
    setInputEmailErr1(inputEmailErr1);
    setInputPasswordErr(inputPasswordErr);
    return isValid;
  };
  return (
    <div className="container col-6 mt-5">
      <div className="card-body bg1">
      <form onSubmit={onSubmit}>
        <div className="form-group row col-10 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
            <p>{t("fullname.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={inputEditDataUser.name}
              id="inputPassword"
              name="name"
            onChange={handleChange}
            />
            {Object.keys(inputFullnameErr).map((key) => {
              return (
                <div style={{ color: "red" }}>{inputFullnameErr[key]}</div>
              );
            })}
          </div>
        </div>
        <div className="form-group row col-10 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
            <p>{t("tel.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              value={inputEditDataUser.phone}
              id="inputPassword"
              name="phone"
              onChange={handleChange}
            />
            {Object.keys(inputTelErr).map((key) => {
              return <div style={{ color: "red" }}>{inputTelErr[key]}</div>;
            })}
          </div>
        </div>
        <div className="form-group row col-10 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
            <p>{t("email.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              value={inputEditDataUser.email}
              id="inputPassword"
              name="email"
              onChange={handleChange}
            />
            {Object.keys(inputEmailErr1).map((key) => {
              return <div style={{ color: "red" }}>{inputEmailErr1[key]}</div>;
            })}
          </div>
        </div>
        <div className="form-group row col-10 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
            <p>{t("password.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              name="password"
              value={inputEditDataUser.password}
              onChange={handleChange}
            />
            {Object.keys(inputPasswordErr).map((key) => {
              return (
                <div style={{ color: "red" }}>{inputPasswordErr[key]}</div>
              );
            })}
          </div>
        </div>
        <div className="row  col-10 mx-auto">
          <button type="submit" class="btn btn-warning col-12">
            <p className="btn-size">{t("ok.1")}</p>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default withRouter(EditUser);
