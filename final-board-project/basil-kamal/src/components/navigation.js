import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navsCon">
      <NavLink
        className="navs"
        to="/uncompletedboards"
        activeClassName="selected"
        exact={true}
      >
        Completed Boards
      </NavLink>
      <NavLink className="navs" to="/" activeClassName="selected" exact={true}>
        Home
      </NavLink>
    </div>
  );
};

export default Navigation;
