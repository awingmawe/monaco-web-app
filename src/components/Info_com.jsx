import React from "react";
import "../styles/Info_style.css";

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
        </div>
      </div>
    </div>
  );
}

export default Info;
