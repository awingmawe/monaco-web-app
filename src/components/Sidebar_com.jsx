import React from "react";

//Import css
import "../styles/Sidebar_style.css";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebar-inner">{props.children}</div>
    </div>
  );
}
