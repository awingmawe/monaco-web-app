import React from "react";
import { Link } from "react-router-dom";

//Import Image
import Telkom from "../assets/logo_telkom.png";
import Monaco from "../assets/MONACO.svg";

//Import Css
import "../styles/SignUp_style.css";
import "../styles/Default_style.css";

export default function SignUp() {
  return (
    <div className="main-container">
      <img src={Telkom} alt="" className="logo-telkom" />
      <div className="inner-container">
        <div className="signup-box">
          <img src={Monaco} alt="" className="logo-monaco" />
          <form action="post">
            <input type="text" placeholder="NIK" />
            <input type="text" placeholder="Password" />
          </form>
          <Link to="/home">
            <button type="button" className="btn-signIn">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
