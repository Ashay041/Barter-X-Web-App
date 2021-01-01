import React, { Component } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import { connect } from "react-redux";
import Footer from "../container/Footer";
import NavbarPage from "../container/NavbarPage";
import "../styles/chat.css";
// Your code stuff...
class Barter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var user = document.getElementById("username").value;
    // this.props.history.push({
    //   pathname: "/chat",
    //   search: "?query=username",
    //   state: { detail: user },
    // });
  }
  render() {
    return (
      <div>
        <div className="page-container">
          <div className="content-wrap">
            <NavbarPage />
            <div>
              <div class="join-container">
                <header class="join-header">
                  <h1>
                    <i class="fas fa-smile"></i> ChatCord
                  </h1>
                </header>
                <main class="join-main">
                  <form onSubmit={this.handleSubmit}>
                    <div class="form-control">
                      <label for="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username..."
                        required
                      />
                    </div>
                    <button type="submit" class="btn">
                      Join Chat
                    </button>
                    <button class="btn">Buy</button>
                  </form>
                </main>
              </div>
            </div>
            {/*<div className="container" style={{ height:'auto', width:'60%' ,border:"1px solid black",borderRadius:"20px" }}>
    <ChatFeed
      messages={this.state.messages}
      isTyping={this.state.is_typing} 
      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
      bubbleStyles={
        {
          text: {
            fontSize: 15
          },
          chatbubble: {
            borderRadius: 20,
            padding: 5
          }
        }
      }
      />
    </div>*/}
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
)(Barter);
