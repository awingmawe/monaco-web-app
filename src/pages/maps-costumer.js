import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import MarkerMerah from "../assets/marker-merah.png";
import MarkerKuning from "../assets/marker-kuning.png";
import MarkerHijau from "../assets/marker-hijau.png";
import Person from "../assets/people.svg";
import SMS from "../assets/sms-alert.svg";
import Status from "../assets/status.svg";

import "leaflet/dist/leaflet.css";

export default function MapsCostumer({ lat, long, status, menu }) {
  const [dataCostumer, setDataCostumer] = useState([]);
  const [loading, setloading] = useState(false);
  const iconMerah = (size) => {
    return L.icon({
      iconUrl: MarkerMerah,
      iconSize: [size],
    });
  };
  const iconHijau = (size) => {
    return L.icon({
      iconUrl: MarkerHijau,
      iconSize: [size],
    });
  };
  const iconKuning = (size) => {
    return L.icon({
      iconUrl: MarkerKuning,
      iconSize: [size],
    });
  };

  const fetchingCostumer = async () => {
    console.log(menu);
    try {
      setloading(true);
      const costum = {
        action: "Customer",
        subAction: "specificODP",
        params: {
          limit: 50,
        },
      };
      const url = "http://8.214.18.134:3026/api";
      const res = await axios.post(url, costum);
      // localStorage.setItem("costumer", JSON.stringify(res.data.content));
      setDataCostumer(res.data.content);
      console.log(res, "ini costumer");
      setloading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchingCostumer();
  }, [menu]);

  return loading ? (
    "Loading"
  ) : (
    <MapContainer
      center={["-6.200000", "106.816666"]}
      zoom={15}
      scrollWheelZoom={false}
      className="mapid"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {dataCostumer.map((a) => (
        <Marker
          position={[a.lat, a.lon]}
          icon={
            a.status === -1
              ? iconMerah(20)
              : a.status === 1
              ? iconHijau(20)
              : iconKuning(20)
          }
        >
          <Popup maxWidth="auto" maxHeight="auto">
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
                    {a.customers.map((ab) => (
                      <tbody>
                        <tr>
                          <td className="tg-fkgn">{ab.snd}</td>
                          <td className="tg-fkgn">{a.customer}</td>
                          <td className="tg-fkgn">Rp. {ab.revenue}</td>
                          <td className="tg-fkgn">{ab.rxOut}</td>
                          <td className="tg-fkgn">
                            {a.status === 0
                              ? "Normal"
                              : a.status === -1
                              ? "Loss"
                              : "Normal"}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  <h5>{a.sto}</h5>
                  <div className="address">
                    <h4>{a.odp}</h4>
                    <p>{a.address}</p>
                  </div>

                  {/* <div className="desc-detail-costumer">
                    <img src={SMS} alt="" onClick={() => alert("sms blast")} />
                  </div> */}
                </div>
                <button className="img-gamas-button">
                  <img src={SMS} alt="" onClick={() => alert("sms blast")} />
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
