import  { React, useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';


export default function Register() {


  const { t } = useTranslation();
  let history = useHistory();
  const [inputRegister, setInputRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [inputFullnameErr,setInputFullnameErr ] = useState({});
  const [inputTelErr,setInputTelErr ] = useState({});
  const [inputEmailErr1,setInputEmailErr1 ] = useState({});
  const [inputPasswordErr,setInputPasswordErr ] = useState({});
  // console.log('tt', inputRegister.email, inputRegister.password)
  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = e.target.value;

    setInputRegister({
      ...inputRegister,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid){
      // send
      const postUser = inputRegister => {
        axios
        .post("http://103.75.200.45:8088/adduser",inputRegister)
        .then(d =>{
          console.log(d);
          alert("successfully");
          history.push('/');
        })
        .catch(err => alert(err));
        console.log("Fail");
      }
      postUser(inputRegister);
      // console.log("submit save", inputRegister);
    // alert(" successfully");
    }
  };

  const formValidation = () =>{
    const inputFullnameErr = {};
    const inputTelErr = {};
    const inputEmailErr1 = {};
    const inputPasswordErr = {};
    let isValid = true;


    if(inputRegister.name.trim().length < 10){
      inputFullnameErr.inputFullnameErrShort = "Short";
      isValid = false;
    }
    if(inputRegister.phone.trim().length < 10){
      inputTelErr.inputTelErrShort = "Short";
      isValid = false;
    }
    if(inputRegister.email.trim().length < 5){
      inputEmailErr1.inputEmailShort = "Short";
      isValid = false;
    }
    if(inputRegister.password.includes("123")){
      inputPasswordErr.inputPasswordin = "error";
      isValid = false;
    }
    if(inputRegister.password.trim().length < 8){
      inputPasswordErr.inputPasswordShort = "Password <8 Short";
      isValid = false;
    }
    setInputFullnameErr(inputFullnameErr);
    setInputTelErr(inputTelErr);
    setInputEmailErr1(inputEmailErr1);
    setInputPasswordErr(inputPasswordErr);
    return isValid;
  }

  return (
    <div className="container col-6 mt-5">
      <form onSubmit={onSubmit}>
        <div className="form-group row col-6 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
            <p>{t("fullname.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              name="name"
              onChange={handleChange}
            />
              {Object.keys(inputFullnameErr).map((key)=>{
                return <div style={{color: "red"}}>{inputFullnameErr[key]}</div>
              })}
          </div>
        </div>
        <div className="form-group row col-6 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
          <p>{t("tel.1")}</p>
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="inputPassword"
              name="phone"
              onChange={handleChange}
            />
              {Object.keys(inputTelErr).map((key)=>{
                return <div style={{color: "red"}}>{inputTelErr[key]}</div>
              })}
          </div>
        </div>
        <div className="form-group row col-6 mx-auto">
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
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
          <label htmlFor="inputPassword" className="col-sm-6 col-form-label">
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
        <div className="row  col-3 mx-auto">
            <button type="submit" class="btn btn-warning col-6">
            <p className="btn-size">{t("ok.1")}</p>
            </button>
        </div>
      </form>
    </div>
  );
}
