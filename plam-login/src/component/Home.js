import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function Home() {
  const { t } = useTranslation();
  const [stateUser, setUserState] = useState([]);
  useEffect(() => {
    // async function fetchData() {
    //   const res = await fetch("http://103.75.200.45:8088/getUser");
    //   res.json().then((res) => setUser(res));
    // }
    // fetchData();
    getUser();
  }, []);
  const getUser = () => {
    axios
      .get("http://103.75.200.45:8088/getUser")
      .then((data) => {
        // console.log(data);
        setUserState(data.data);
      })
      .catch((err) => alert(err));
  };
  // const res2 = fetch('http://103.75.200.45:8088/getUser')
  // .then(response => response.json())
  // .then(json => console.log(json))

  // const Tr = ({nameuser}) => {
  //   return(
  //     <tr>
  //       <td>{nameuser.name}</td>
  //       <td>{nameuser.email}</td>
  //       <td>{nameuser.phone}</td>
  //       <td>{nameuser.password}</td>
  //       <td><button type="button" className="btn btn-primary">แก้ไข</button></td>
  //     </tr>
  //   )
  // }

  // return (
  //   <div>
  //     user: {user.length}
  //     <h1>HOME</h1>
  //     <p>{JSON.stringify(user)}</p>

  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th scope="col">Name</th>
  //           <th scope="col">Email</th>
  //           <th scope="col">Tel</th>
  //           <th scope="col">Password</th>
  //           <th scope="col">Edit</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {user.map((p,index)=>{
  //           return <Tr key={index} nameuser={p} />
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  
  // const sentTest = ()=>{
  //   console.log("aaaaaaa");
  //   onClick={e => {sentTest()}}
  // }
  const Tr = ({nameuser}) => {
    return(
      <tr key={nameuser.id}>
        <td>
          <input
            type="checkbox"checked={nameuser.select}
            onChange={e =>{
              let value = e.target.checked;
              setUserState(
                stateUser.map(sd => {
                  if (sd.id === nameuser.id){
                    sd.select = value;
                    console.log(sd)
                  }
                  return sd;
                })
              );
            }}
          />
        </td>
        <th scope="row">{nameuser.id}</th>
        <td>{nameuser.name}</td>
        <td>{nameuser.email}</td>
        <td>{nameuser.phone}</td>
        <td>{nameuser.password}</td>
        <td>
          <Link to={`/edit/${nameuser.id}`}>
            <button type="button" className="btn btn-primary">{t("edit.1")}</button>
          </Link>
        </td>
      </tr>
    )
  }
  return (
    <div className="container card-body">
      {/* {console.log(stateUser)} */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t("id.1")}</th>
            <th scope="col">{t("fullname.1")}</th>
            <th scope="col">{t("email.1")}</th>
            <th scope="col">{t("password.1")}</th>
            <th scope="col">{t("tel.1")}</th>
            <th scope="col">{t("edit.1")}</th>
          </tr>
        </thead>
        <tbody>
        {stateUser.map((p,index)=>{
            return <Tr key={index} nameuser={p} />
          })}
          {/* {stateUser.map(data=> {
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
              <td>{data.phone}</td>
            </tr>;
          })} */}
        </tbody>
      </table>
    </div>
  );
}
