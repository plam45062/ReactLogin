import  { React, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';


export default function LoginTest() {
  const { t } = useTranslation();
  let history = useHistory();
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
    btn: false,
  });

  // fetch('http://103.75.200.45:8088/getUser')
  // .then(response => response.json())
  // .then(json => console.log(json))

  const [inputEmailErr1,setInputEmailErr1 ] = useState({});
  const [inputPasswordErr,setInputPasswordErr ] = useState({});

  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = name === "btn" ? e.target.checked : e.target.value;

    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if(isValid){
      // send
      const Login = inputLogin => {
        axios
        .post("http://103.75.200.45:8088/login ",inputLogin)
        .then(d =>{
          console.log(d);
          console.log("Login sussress");
          history.push('/home')
        })
        .catch(err => alert(err));
        console.log("Login Fail");
      }
      Login(inputLogin);
      // history.push('/home')
      // console.log("submit save", inputLogin);
    }

  };
  const formValidation = () =>{
    const inputEmailErr1 = {};
    const inputPasswordErr = {};
    let isValid = true;

    if(inputLogin.email.trim().length < 5){
      inputEmailErr1.inputEmailShort = "Short";
      isValid = false;
    }

    if(inputLogin.password.includes("123")){
      inputPasswordErr.inputPasswordin = "error";
      isValid = false;
    }
    if(inputLogin.password.trim().length < 8){
      inputPasswordErr.inputPasswordShort = "Password <8 Short";
      isValid = false;
    }
    setInputEmailErr1(inputEmailErr1);
    setInputPasswordErr(inputPasswordErr);
    return isValid;
  }

  return (
    <div className=" container col-6 mt-5">
      <div className="card-body bglogin">
      <form onSubmit={onSubmit}>
        <div className="form-group row col-10 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
          <p>{t("email.1")}</p>
          </label>
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              id="inputPassword"
              name="email"
              onChange={handleChange}
            />
              {Object.keys(inputEmailErr1).map((key)=>{
                return <div style={{color: "red"}}>{inputEmailErr1[key]}</div>
              })}
          </div>
        </div>
        <div className="form-group row col-10 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
          <p>{t("password.1")}</p>
          </label>
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              onChange={handleChange}
            />
              {Object.keys(inputPasswordErr).map((key)=>{
                return <div style={{color: "red"}}>{inputPasswordErr[key]}</div>
              })}
          </div>
        </div>
        <div className="row col-10 mx-auto">
          <div className="form-group row form-check col-11 mr-auto">
            {/* <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="btn"
              onChange={handleChange}
            />
            <label className="form-check-label mr-2" htmlFor="exampleCheck1">
            Remember password
            </label> */}
            <Link to="/register">
              <button type="button" className="btn btn-warning mr-2">
                <p className="btn-size">{t("register.1")}</p>
              </button>
            </Link>
            <Link to="/Repassword">
              <button type="button" className="btn btn-danger">
                <p className="btn-size">{t("repassword.1")}</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="row col-3 mx-auto">
          <button type="submit" className="btn btn-primary col-12">
          <p className="btn-size">{t("login.1")}</p>
          </button>
        </div>
      </form><br></br>
      </div>
    </div>
  );
}
