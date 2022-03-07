import React, { useState } from "react";

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
import Notif from "../assets/notification.png";
import NotifAktif from "../assets/notification-aktif.png";
import Arrow from "../assets/arrow.png";
import Back from "../assets/next.png";
import Search from "../assets/search.png";

//Import Css
import "../styles/Default_style.css";
import "../styles/Home_style.css";
import Sidebar from "../components/Sidebar_com";
import Info from "../components/Info_com";

export default function Home() {
  const [active, setActive] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState(false);
  const [activeGamas, setActiveGamas] = useState(false);
  const [activeAnnounce, setActiveAnnounce] = useState(false);
  const [activeShape, setActiveShape] = useState(false);

  const changeActive = (type) => {
    if (type === "gamas") {
      setActiveGamas(!activeGamas);
    }
    if (type === "customer") {
      setActiveCustomer(!activeCustomer);
    }
    if (type === "announce") {
      setActiveAnnounce(!activeAnnounce);
    }
    if (type === "shape") {
      setActiveShape(!activeShape);
    }
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
              onClick={() => changeActive("shape")}
            >
              <img src={activeShape ? ShapeAktif : Shape} alt="" />
              <h4>DDP</h4>
            </div>
            <div
              className={
                activeCustomer ? "dua menu-list active" : "dua menu-list"
              }
              onClick={() => changeActive("customer")}
            >
              <img src={activeCustomer ? CustomerAktif : Customer} alt="" />
              <h4>Customer</h4>
            </div>
            <div
              className={
                activeGamas ? "tiga menu-list active" : "tiga menu-list"
              }
              onClick={() => changeActive("gamas")}
            >
              <img src={activeGamas ? GamasAktif : Gamas} alt="" />
              <h4>Gamas</h4>
            </div>
            <div
              className={
                activeAnnounce ? "empat menu-list active" : "empat menu-list"
              }
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
          {" "}
          <Info />
        </div>
      </div>
    </div>
  );
}
