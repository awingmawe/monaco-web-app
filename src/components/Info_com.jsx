import React from "react";
import "../styles/Info_style.css";

// Import image
import Person from "../assets/people.svg";
import SMS from "../assets/sms-alert.svg";
import Status from "../assets/status.svg";

function Info(props) {
  return (
    <div className="info-container">
      <div className="info-box">
        <div className="info-inner">
          <table className="tg">
            <thead>
              <tr>
                <th className="tg-fkgn">SND</th>
                <th className="tg-fkgn">CP</th>
                <th className="tg-fkgn">Revenue</th>
                <th className="tg-fkgn">Rx Ont</th>
                <th className="tg-fkgn">Status ODP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tg-fkgn">123565789</td>
                <td className="tg-fkgn">0872631723</td>
                <td className="tg-fkgn">Rp. 700.000,-</td>
                <td className="tg-fkgn">-</td>
                <td className="tg-fkgn">LOSS</td>
              </tr>
            </tbody>
          </table>
          <h5>STO PSM</h5>
          <div className="address">
            <h4>ODP-PSM-FAQ/03</h4>
            <p>Jalan Asem V Cilandak Timur</p>
          </div>
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

export default Info;
