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

export default function MapsODP({ lat, long, status, menu }) {
  const [dataOdp, setDataOdp] = useState([]);
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

  useEffect(() => {
    fetchingOdp();
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

      {dataOdp.map((b) => (
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
      ))}
    </MapContainer>
  );
}
