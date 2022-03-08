import React from "react";

// Import Styles
import "../styles/MoreInfo_style.css";
import Person from "../assets/people.svg";
import SMS from "../assets/sms-alert.svg";
import Status from "../assets/status.svg";

function MoreInfo(props) {
  return (
    <div className="info-box">
      <div className="info-inner">
        <h5>STO PSM</h5>
        <div className="address">
          <h4>ODP-PSM-FAQ/03</h4>
          <p>Jalan Asem V Cilandak Timur</p>
        </div>
        <div className="desc-detail">
          <div className="status">
            <p>
              <img src={Person} alt="" />8
            </p>
            <p>
              <img src={Status} alt="" />
              Loss
            </p>
            <p>5.6jt</p>
          </div>
          <img src={SMS} alt="" />
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
