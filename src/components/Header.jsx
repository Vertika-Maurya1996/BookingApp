import { useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

import logo from "../assets/images/sample4.png"

const Header = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem('userID')
    navigate("/");
  };
  const userType = localStorage.getItem('userType')
  return (
    <Navbar className="app-header">
      <NavbarBrand className="mx-4 " onClick={()=>navigate("/home")}><img src={logo} className="brand-logo"/></NavbarBrand>
      <Nav >
      <NavItem>
          <NavLink href={userType == 1? "/home-driver":"/home"} className="text-primary">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href={userType == 1? "/profile-driver":"/profile-user"} className="text-primary">My Profile</NavLink>
        </NavItem>
        <NavItem>
          <Button className="btn-submit" onClick={logoutUser}>
          <NavLink href="#" className="text-white" >
            Logout
          </NavLink>
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
