import React from "react";
import { Nav, NavLink, NavMenu }
  from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <h1>Randy's Smoothie Shack&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/trending" activeStyle>
            Trending Smoothies
          </NavLink>
          <NavLink to="/allSmoothies" activeStyle>
            All Smoothies
          </NavLink>
          <NavLink to="/addSmoothies" activeStyle>
            Add Smoothies
          </NavLink>
          <NavLink to="/favorites" activeStyle>
            Favorites
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <h1>&emsp;&emsp;</h1>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/sign-up" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
