import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../components/images/bartar.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import barter from "../components/images/bartar.png";

import {
  MdPerson,
  MdRestore,
  MdViewHeadline,
  MdSettings,
  MdAttachMoney,
  MdAddCircle,
  MdPermIdentity,
  MdMenu,
  MdSearch,
  MdUpdate,
  MdCreditCard,
  MdAutorenew,
} from "react-icons/md";
class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "active",
      isOpen: true,
    };
    this.onClickToggle = this.onClickToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    // const { logout } = this.props;
    // logout();
    localStorage.clear();
    window.location.href = "/";
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  onClickToggle() {
    if (this.state.active === "active") {
      this.setState({ active: "" });
      this.setState({ buttonClass: "fa-arrow-right" });
    } else {
      this.setState({ active: "active" });
    }
  }

  render() {
    return (
      <div>
        <Navbar className="custom" sticky="top">
          <div>
            <a href="/home" className=" mt-2">
              <img src={logo} alt="logo" className="logo" />
            </a>
          </div>

          <Nav className="ml-auto" style={{ marginRight: "10px" }}>
            <Button
              className="buttonNav"
              style={{
                color: "white",
                fontWeight: "bold",
                borderRadius: "15px",
                backgroundColor: "purple",
                border: "0",
              }}
            >
              <MdAutorenew size={20} style={{ color: "white" }} />
              Exchange
            </Button>
            <NavDropdown
              id="collasible-nav-dropdown"
              title={
                <MdPerson
                  size={32}
                  style={{ color: "orange", marginRight: "15px" }}
                />
              }
            >
              <NavDropdown.Item href="/profile">
                {" "}
                <MdPerson size={20} style={{ color: "#6B3069" }} />
                <b> My Profile</b>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/transactions">
                <MdRestore size={20} style={{ color: "#6B3069" }} />
                <b> Past Transaction</b>
              </NavDropdown.Item>
              <NavDropdown.Item href="/myproducts">
                <MdViewHeadline size={20} style={{ color: "#6B3069" }} />
                <b> My products</b>
              </NavDropdown.Item>
              <NavDropdown.Item href="/buytokens">
                <MdAttachMoney size={20} style={{ color: "#6B3069" }} />
                <b>Buy Tokens</b>
              </NavDropdown.Item>
              <NavDropdown.Item href="">
                <MdSettings size={20} style={{ color: "#6B3069" }} />
                <b>Setting</b>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout}>
                <RiLogoutBoxLine size={20} style={{ color: "#6B3069" }} />
                <b> Logout</b>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              href="/search"
              style={{ fontSize: "20px", color: "#6B3069" }}
            >
              All Products
            </Nav.Link>
          </Nav>
          {/*<Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>*/}
        </Navbar>
      </div>
    );
  }
}

export default NavbarPage;
