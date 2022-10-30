import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
        <NavLink to='/home' activeStyle>
            Home
        </NavLink>
        <NavLink to='/find_smoothies' activeStyle>
            Find Smoothies
        </NavLink>
        <NavLink to='/favorites' activeStyle>
            Favorites
        </NavLink>
        <NavLink to='/about' activeStyle>
            About
        </NavLink>
        {/* Second Nav */}
        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;