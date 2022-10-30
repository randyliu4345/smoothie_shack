import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
background: #63D471;
height: 85px;
display: flex;
justify-content: space-between;
z-index: 12;

`;

export const NavLink = styled(Link)`
color: #808080;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #000000;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;

`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;

`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

margin-left: 24px;
&:hover {
	background: #fff;
	color: #808080;
}
`;
