import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Maps from "./maps.js";
import MapsODP from "./maps-odp.js";
import MapsGamas from "./maps-gamas.js";
import MapsCostumer from "./maps-costumer.js";

//Import Image
import Monaco from "../assets/MONACO.svg";
import Customer from "../assets/costumer.svg";
import CustomerAktif from "../assets/costumer-aktif.svg";
import Gamas from "../assets/Gamas.svg";
import GamasAktif from "../assets/Gamas-aktif.svg";
import Shape from "../assets/Shape.svg";
import ShapeAktif from "../assets/Shape-aktif.svg";
import Announce from "../assets/loudspeaker.png";
import AnnounceAktif from "../assets/loudspeaker-aktif.png";
import MarkerMerah from "../assets/marker-merah.png";
import MarkerKuning from "../assets/marker-kuning.png";
import MarkerHijau from "../assets/marker-hijau.png";
import Notif from "../assets/notification.png";
// import NotifAktif from "../assets/notification-aktif.png";
import Arrow from "../assets/arrow.png";
import Back from "../assets/next.png";
import Search from "../assets/search.png";

//Import Css
import "leaflet/dist/leaflet.css";
import "../styles/Info_style.css";
import "../styles/Default_style.css";
import "../styles/Home_style.css";
import Sidebar from "../components/Sidebar_com";

// var Myicon = L.icon({
//   iconUrl: Shape,
//   iconSizw,
// });

export default function Home() {
  const [active, setActive] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState(false);
  const [activeGamas, setActiveGamas] = useState(false);
  const [activeAnnounce, setActiveAnnounce] = useState(false);
  const [activeShape, setActiveShape] = useState(true);

  const changeActive = (type) => {
    if (type === "gamas") {
      setActiveGamas(!activeGamas);
      setActiveShape(false);
      setActiveCustomer(false);
      setActiveAnnounce(false);
    }
    if (type === "customer") {
      setActiveCustomer(!activeCustomer);
      setActiveGamas(false);
      setActiveShape(false);
      setActiveAnnounce(false);
    }
    if (type === "announce") {
      setActiveAnnounce(!activeAnnounce);
      setActiveCustomer(false);
      setActiveGamas(false);
      setActiveShape(false);
    }
    if (type === "shape") {
      setActiveShape(!activeShape);
      setActiveAnnounce(false);
      setActiveCustomer(false);
      setActiveGamas(false);
    }
  };

  const icontest = (size) => {
    return L.icon({
      iconUrl: MarkerMerah,
      iconSize: [size],
    });
  };
  return (
    <div className="home-container">
      <div className="nav-container">
        <div className="nav-inner">
          <img src={Monaco} alt="" className="monaco-logo" />
          <div className="user-info">
            <img src={Notif} alt="" />
            <div className="profil-pic">{/* Gambar Profile */}</div>
            <p>Nama</p>
            <div className="sign-out">
              <img
                src={Arrow}
                alt=""
                className={active ? "arrow-aktif" : "arrow"}
                onClick={() => setActive(!active)}
              />
              <div
                className={active ? "sign-out-menu active" : "sign-out-menu"}
              >
                <div className="sign-out-menu-inner">
                  <div className="profil-pic">{/* Gambar Profile */}</div>
                  <p>Nama</p>
                </div>
                <h4>SIGN OUT</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-inner">
        {/* Sidebar */}
        <Sidebar>
          <div className="input-search">
            <img src={Search} alt="" />
            <input type="text" placeholder="Search" />
          </div>
          <h2>Menu</h2>
          <div className="container-menu">
            <div
              className={
                activeShape ? "satu menu-list active" : "satu menu-list"
              }
              // onMouseOver={() => changeActive("shape")}
              // onMouseOut={() => changeActive("shape")}
              onClick={() => changeActive("shape")}
            >
              <img src={activeShape ? ShapeAktif : Shape} alt="" />
              <h4>DDP</h4>
            </div>
            <div
              className={
                activeCustomer ? "dua menu-list active" : "dua menu-list"
              }
              // onMouseOver={() => changeActive("customer")}
              // onMouseOut={() => changeActive("customer")}
              onClick={() => changeActive("customer")}
            >
              <img src={activeCustomer ? CustomerAktif : Customer} alt="" />
              <h4>Customer</h4>
            </div>
            <div
              className={
                activeGamas ? "tiga menu-list active" : "tiga menu-list"
              }
              // onMouseOver={() => changeActive("gamas")}
              // onMouseOut={() => changeActive("gamas")}
              onClick={() => changeActive("gamas")}
            >
              <img src={activeGamas ? GamasAktif : Gamas} alt="" />
              <h4>Gamas</h4>
            </div>
            <div
              className={
                activeAnnounce ? "empat menu-list active" : "empat menu-list"
              }
              // onMouseOver={() => changeActive("announce")}
              // onMouseOut={() => changeActive("announce")}
              onClick={() => changeActive("announce")}
            >
              <img src={activeAnnounce ? AnnounceAktif : Announce} alt="" />
              <h4>Utility</h4>
            </div>
          </div>
          <img src={Back} alt="" className="back-arrow" />
        </Sidebar>
        {/* Google Api */}
        <div className="google-maps">
          {activeGamas === true ? (
            <MapsGamas
              lat={-6.2}
              long={106.816666}
              status="hijau"
              menu="gamas"
              key="3"
            />
          ) : activeCustomer === true ? (
            <MapsCostumer
              lat={-6.966667}
              long={110.416664}
              status="merah"
              menu="costumer"
              key="1"
            />
          ) : activeShape === true ? (
            <MapsODP
              lat={-6.914744}
              long={107.60981}
              status="kuning"
              menu="odp"
              key="2"
            />
          ) : (
            <MapContainer
              center={[-6.914744, 107.60981]}
              zoom={13}
              scrollWheelZoom={false}
              className="mapid"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={([-6.914744, 107.60981], [-6.914744, 107.60981])}
                icon={icontest(20)}
              >
                <Popup>RICKY ALAMSYAH PERMANA</Popup>
              </Marker>
              <Marker
                position={([-6.914744, 107], [-6.914744, 107])}
                icon={icontest(20)}
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
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}
