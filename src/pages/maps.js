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

export default function Maps({ lat, long, status, menu }) {
  const [dataOdp, setDataOdp] = useState([]);
  const [dataGamas, setDataGamas] = useState([]);
  const [dataGamasPoly, setDataGamasPoly] = useState([]);
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

  const fetchingOdp = async () => {
    console.log(menu);
    try {
      setloading(true);
      const data = {
        action: "ODP",
        subAction: "listODP",
        params: {
          limit: 50,
        },
      };
      const url = "http://8.214.18.134:3026/api";
      const res = await axios.post(url, data);
      console.log(res.data.content);
      // localStorage.setItem("odp", JSON.stringify(res.data.content));
      setDataOdp(res.data.content, "ini odp");
      setloading(false);
    } catch (error) {}
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

  const fetchingGamas = async () => {
    console.log(menu);
    try {
      setloading(true);
      const gamas = {
        action: "Gamas",
        subAction: "clusterODP",
        params: {
          limit: 50,
        },
      };
      const url = "http://8.214.18.134:3026/api";
      const res = await axios.post(url, gamas);
      setDataGamas(res.data.content);
      // console.log(res.data);
      // setDataGamasPoly(res.data.content.cluster);
      // localStorage.setItem("gamas", JSON.stringify(res.data.content.data));
      // console.log(res.data.content, "ini Gamas");
      setloading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (menu === "odp") {
      fetchingOdp();
    } else if (menu === "costumer") {
      fetchingCostumer();
    } else if (menu === "gamas") {
      // setloading(true);
      fetchingGamas();
    }
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
      {
        menu === "costumer" ? (
          dataCostumer.map((a) => (
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
                {/* {console.log(a)} */}

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
                      <div className="desc-detail-costumer">
                        <img
                          src={SMS}
                          alt=""
                          onClick={() => alert("sms blast")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))
        ) : menu === "odp" ? (
          dataOdp.map((b) => (
            <Marker
              position={[b.lat, b.lon]}
              icon={
                b.status === -1
                  ? iconMerah(20)
                  : b.status === 1
                  ? iconHijau(20)
                  : iconKuning(20)
              }
            >
              <Popup maxWidth="auto" maxHeight="auto">
                <div className="info-container-odp">
                  <div className="info-box-odp">
                    <div className="info-inner-odp">
                      <h5>{b.sto}</h5>
                      <div className="address">
                        <h4>{b.odp}</h4>
                        <p>{b.address}</p>
                      </div>
                    </div>
                    <div className="desc-detail-odp">
                      <div className="status-odp">
                        <p>
                          <img src={Person} alt="" />
                          {b.customers}
                        </p>
                        <p>
                          <img src={Status} alt="" />
                          {b.status === -1 ? "Loss" : "ON"}
                        </p>
                        <p>Rp.{b.revenue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <div>
            {/* "Loading" */}
            {console.log(dataGamas, "data poly")}
          </div>
        )
        // dataGamas.data.map((c) => (
        //   <Marker
        //     position={[c.lat, c.lon]}
        //     icon={
        //       c.status === -1
        //         ? iconMerah(20)
        //         : c.status === 1
        //         ? iconHijau(20)
        //         : iconKuning(20)
        //     }
        //   >
        //     <Popup maxWidth="auto" maxHeight="auto">
        //       <div className="info-container-odp">
        //         <div className="info-box-odp">
        //           <div className="info-inner-odp">
        //             <h5>STO PSM</h5>
        //             <div className="address">
        //               <h4>ODP-PSM-FAQ/03</h4>
        //               <p>Jalan Asem V Cilandak Timur</p>
        //             </div>
        //             <div className="desc-detail-odp">
        //               <div className="status-odp">
        //                 <p>
        //                   <img src={Person} alt="" />8
        //                 </p>
        //                 <p>
        //                   <img src={Status} alt="" />
        //                   Loss
        //                 </p>
        //                 <p>5.6jt</p>
        //               </div>
        //             </div>
        //             <div className="img-gamas">
        //               <button className="img-gamas-button">
        //                 <img src={SMS} alt="" />
        //               </button>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </Popup>
        //     {/* {dataGamas.cluster.map((d) => (
        //     <Polygon positions={d.elements} />
        //   ))} */}
        //   </Marker>
        // ))
      }
    </MapContainer>
  );
}
