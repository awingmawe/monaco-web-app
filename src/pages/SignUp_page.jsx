import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Import Image
import Telkom from "../assets/logo_telkom.png";
import Monaco from "../assets/MONACO.svg";

//Import Css
import "../styles/SignUp_style.css";
import "../styles/Default_style.css";

import configData from "../config.json";

export default function SignUp() {
  const [nik, setNik] = useState("");
  const currentPath = window.location.pathname;
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sumbit = async () => {
    const data = {
      action: "Users",
      subAction: "login",
      params: {
        username: nik,
        password: password,
      },
    };
    const url = "http://8.214.18.134:3026/api";
    const res = await axios.post(url, data);
    if (res.data.code === -1) {
      alert("Gagal Login");
    } else {
      navigate(currentPath + "home", {
        replace: false,
      });
    }
  };
  return (
    <div className="main-container">
      <img src={Telkom} alt="" className="logo-telkom" />
      <div className="inner-container">
        <div className="signup-box">
          <img src={Monaco} alt="" className="logo-monaco" />
          <form action="post">
            <input
              type="text"
              placeholder="NIK"
              // pattern="[0-9]*"
              // onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              onChange={(event) => setNik(event.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          {/* <Link to="/home"> */}
          <button type="button" className="btn-signIn" onClick={sumbit}>
            SIGN IN
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
