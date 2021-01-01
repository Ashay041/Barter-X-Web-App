import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardTitle, CardBody } from "reactstrap";
import NavbarPage from "../container/NavbarPage";
import Footer from "../container/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ViewProfile from "./ViewProfile ";
import EditProfile from "./EditProfile";
import "react-tabs/style/react-tabs.css";
import Wallet from "./Wallet";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <NavbarPage />
        <div>
          <Tabs>
            <TabList style={{ fontStyle: "bold" }}>
              <Tab>View Profile</Tab>
              <Tab>Edit Profile</Tab>
              <Tab>Wallet</Tab>
            </TabList>
            <TabPanel>
              <ViewProfile />
            </TabPanel>
            <TabPanel>
              <EditProfile />
            </TabPanel>
            <TabPanel>
              <Wallet />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    path: store.walletPath,
  }),
  {}
)(Profile);
