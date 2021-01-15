import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';

export default function Repassword() {
  const { t } = useTranslation();
  // const [email, setEmail] = useState('');
  let history = useHistory();
  const [inputRepass, setInputRepass] = useState({
    email: "",
    password: "",
    newpassword:""
  });
  const [inputEmailErr1,setInputEmailErr1 ] = useState({});
  const [inputPasswordErr,setInputPasswordErr ] = useState({});
  const [inputNewPasswordErr,setInputNewPasswordErr ] = useState({});

  // console.log('tt', inputRepass.email, inputRepass.password)
  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = e.target.value;

    setInputRepass({
      ...inputRepass,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if(isValid){
      // send
      const Repass = inputRepass => {
        axios
        .post("http://103.75.200.45:8088/changepass",inputRepass)
        .then(d =>{
          console.log(d);
          console.log("Repass sussress");
          history.push('/')
        })
        .catch(err => alert(err));
        console.log("Repass Fail");
      }
      Repass(inputRepass);
    }
  };
  const formValidation = () =>{
    const inputEmailErr1 = {};
    const inputPasswordErr = {};
    let isValid = true;

    if(inputRepass.email.trim().length < 5){
      inputEmailErr1.inputEmailShort = "Short";
      isValid = false;
    }

    if(inputRepass.password.includes("123")){
      inputPasswordErr.inputPasswordin = "error";
      isValid = false;
    }
    if(inputRepass.password.trim().length < 8){
      inputPasswordErr.inputPasswordShort = "Password <8 Short";
      isValid = false;
    }
    setInputEmailErr1(inputEmailErr1);
    setInputPasswordErr(inputPasswordErr);
    return isValid;
  }

  return (
    <div className="bg">
      <form onSubmit={onSubmit}>
        <div className="form-group row col-6 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
          <p>{t("email.1")}</p>
          </label>
          <div className="col-sm-10">
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
        <div className="form-group row col-6 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
          <p>{t("password.1")}</p>
          </label>
          <div className="col-sm-10">
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
        <div className="form-group row col-6 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
          <p>{t("newpassword.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="newpassword"
              onChange={handleChange}
            />
            {Object.keys(inputNewPasswordErr).map((key)=>{
              return <div style={{color: "red"}}>{inputNewPasswordErr[key]}</div>
            })}
          </div>
        </div>
        <div className="form-group row form-check col-11 mr-auto">
          <label className="form-check-label mr-2" htmlFor="exampleCheck1">

          </label>
        </div>
        <div className="row col-6 mx-auto">
          <button type="submit" className="btn btn-primary col-3">
            <p className="btn-size">{t("ok.1")}</p>
          </button>
        </div>
      </form>
    </div>
  );
}
