import React, { Component } from "react";
// import { showProfile } from "../store/actions";
import { connect } from "react-redux";
import NavbarPage from "../container/NavbarPage";
import "../styles/HomePage.css";
import Carousel from "./Carousel";
import Products from "./Products";
import Category from "./Category";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavbarPage />
        <div
          style={{
            backgroundColor: "#342726",
            height: "100%",
            marginTop: "0px",
            verticalAlign: "top",
          }}
        >
          <Category />
        </div>
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container"></div>
          </div>
          <div>
            <Carousel />
          </div>
          <div>
            <Products />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => ({}), {})(HomePage);
