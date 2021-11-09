import React from "react";
import Sidebar from "./Sidebar";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "",
  children
}) => (
  <div className="">
    <Menu />
    <div className="pt-11 mt-12">
      <div className="w-full text-center">
        <h2 className="text-black font-mono md:ui-monospace text-3xl pt-7	">{title}</h2>
        <p className="text-black font-mono md:ui-monospace text-xl">{description}</p>
      </div>
      <div className="">     
        {children}
        </div>
    </div>
  </div>
);

export default Base;
