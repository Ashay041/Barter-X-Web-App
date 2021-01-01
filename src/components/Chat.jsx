import React, { Component } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import { connect } from "react-redux";
import Footer from "../container/Footer";
import NavbarPage from "../container/NavbarPage";
import "../styles/chat.css";
// import "./js/chat.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Your code stuff...
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const location = useLocation();
    useEffect(() => {
      console.log(location.pathname); // result: '/secondpage'
      console.log(location.search); // result: '?query=abc'
      console.log(location.state.detail); // result: 'some_value'
    }, [location]);
  }
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <NavbarPage />
          <div>
            <div id="frost-chat">
              <div id="chat-window">
                <div id="output"></div>
                <div id="feedback"></div>
              </div>
              <div id="handle">Your socket ID: </div>
              <input id="sendto" type="text" placeholder="Send To" />
              <input type="number" id="yprod" placeholder="Your Product" />
              <input type="number" id="cprod" placeholder="Customer Product" />
              <input type="text" id="docHash" placeholder="Doc HASH" />
              <button id="send" class="btnblnk">
                Send
              </button>
            </div>
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    path: store.walletPath,
    productHistory: store.productHistory,
  }),
  {}
)(Chat);
