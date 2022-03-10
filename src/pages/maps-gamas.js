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

export default function MapsGamas({ lat, long, status, menu }) {
  const [dataGamas, setDataGamas] = useState([]);
  const [dataGamasCluster, setDataGamasCluster] = useState([]);
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

      setDataGamas(res.data.content.data);
      setDataGamasCluster(res.data.content.cluster);

      // console.log(res.data);
      // setDataGamasPoly(res.data.content.cluster);
      // localStorage.setItem("gamas", JSON.stringify(res.data.content.data));
      console.log(res.data.content);
      setloading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchingGamas();
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

      {dataGamas.map((c) => (
        <Marker
          position={[c.lat, c.lon]}
          icon={
            c.status === -1
              ? iconMerah(20)
              : c.status === 1
              ? iconHijau(20)
              : iconKuning(20)
          }
        >
          {/* <Popup maxWidth="auto" maxHeight="auto">
            <div className="info-container-odp">
              <div className="info-box-odp">
                <div className="info-inner-odp">
                  <h5>STO PSM</h5>
                  <div className="address">
                    <h4>ODP-PSM-FAQ/03</h4>
                    <p>Jalan Asem V Cilandak Timur</p>
                  </div>
                  <div className="desc-detail-odp">
                    <div className="status-odp">
                      <p>
                        <img src={Person} alt="" />8
                      </p>
                      <p>
                        <img src={Status} alt="" />
                        Loss
                      </p>
                      <p>5.6jt</p>
                    </div>
                  </div>
                  <div className="img-gamas">
                    <button className="img-gamas-button">
                      <img src={SMS} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Popup> */}
        </Marker>
      ))}

      {dataGamasCluster.map((d) => (
        <Polygon color={"red"} positions={d.elements}>
          <Popup maxWidth="auto" maxHeight="auto">
            <div className="info-container-odp">
              <div className="info-box-odp">
                <div className="info-inner-odp">
                  <h5>STO PSM</h5>
                  <div className="address">
                    <h4>ODP-PSM-FAQ/03</h4>
                    <p>Jalan Asem V Cilandak Timur</p>
                  </div>
                </div>
                <div className="desc-detail-odp">
                  <div className="status-odp">
                    <p>
                      <img src={Person} alt="" />
                      {d.customerCount}
                    </p>
                    <p>
                      <img src={Status} alt="" />
                      {d.odpCount}
                    </p>
                    <p>Rp. {d.revenueCount}</p>
                  </div>
                </div>
                <button className="img-gamas-button">
                  <img src={SMS} alt="" />
                </button>
              </div>
            </div>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}
