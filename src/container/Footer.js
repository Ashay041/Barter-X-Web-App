import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebookSquare } from "react-icons/fa";
import "../styles/footer.css";
import logo from "../components/images/bartar.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
  return (
    <MDBFooter className="font-small pt-4 mt-4 main-footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3" sm="6">
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/">Log in</Link>
              </li>
            </ul>
          </MDBCol>
          <MDBCol>
            <h5 className="title" style={{ color: "white" }}>
              Connect Us On
            </h5>
            <ul className="list-unstyled">
              <a href="https://www.instagram.com/barterx.co/?hl=en">
                <FaInstagram size="2rem" className="FaInstagram" />
              </a>
              <FaWhatsapp
                size="2rem"
                style={{ marginLeft: "10%" }}
                className="FaWhatsapp"
              />
              <FaFacebookSquare
                size="2rem"
                style={{ marginLeft: "10%" }}
                className="FaFacebookSquare"
              />
            </ul>
          </MDBCol>
          <h5 className="title" style={{ color: "white" }}>
            Contact Us
          </h5>
          <ul>
            <li className="list-unstyled">
              <a href="#!">customer.care@Barterx.co.in</a>
            </li>
            <li className="list-unstyled">09867665457</li>
          </ul>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid style={{ color: "white" }}>
          &copy; {new Date().getFullYear()}
          <a href="/terms"> All rights reserved </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
