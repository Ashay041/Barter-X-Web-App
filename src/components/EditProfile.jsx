import React, { Component } from "react";
import Sidenav from "../container/SideNav";
// import { showProfile } from "../store/actions";
import { connect } from "react-redux";
import profile from "../components/images/download.jpeg";
import "../styles/profile.css";
import { ToastContainer, toast } from "react-toastify";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      emailID: "srushti@gmail.com",
      wallet: {
        orgName: "Department1",
        org_aff: "org1",
        usr_id: "srush",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    if (localStorage.wallet !== undefined) {
      let localStorageData = localStorage.wallet.split(",");
      const usrid = localStorageData[0];
      const orgName = localStorageData[1];
      const orgAff = localStorageData[2];
      const email = localStorageData[3];
      // console.log(email);
      this.setState({ emailID: email });
      let wallet = {};
      wallet["usr_id"] = usrid;
      wallet["orgName"] = orgName;
      wallet["org_aff"] = orgAff;
      this.setState({ wallet: wallet });
    } else {
      toast("Login first", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  }
  loadData(user) {
    this.setState({ data: user });
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  editform() {
    var form = document.getElementById("form");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = !elements[i].readOnly;
    }
    var cancelButton = document.getElementById("cancelBtn");
    cancelButton.disabled = !cancelButton.disabled;

    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }

  render() {
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-2">
            <img
              src={profile}
              className="hover"
              alt="ProfileImage"
              style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            />
          </div>
          <div className="col-5" style={{}}>
            <form id="form" onSubmit={this.handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder={this.state.wallet.usr_id}
                className="form-control input"
                style={{ backgroundColor: "white" }}
              />
              <label>Organisation Name:</label>
              <input
                type="text"
                name="orgName"
                id="orgName"
                placeholder={this.state.wallet.org_aff}
                style={{ backgroundColor: "white" }}
                className="form-control input"
              />
              <label>Affiliation Name:</label>
              <input
                type="text"
                name="org_Aff"
                id="org_Aff"
                placeholder={this.state.wallet.orgName}
                className="form-control input"
                style={{ backgroundColor: "white" }}
              />
              <label>Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder={this.state.emailID}
                className="form-control input"
                style={{ backgroundColor: "white" }}
              />
              <div>
                <input
                  type="submit"
                  id="editButton"
                  className="btn btn-secondary"
                  value="Save"
                  style={{
                    backgroundColor: "orange",
                    border: "none",
                    borderRadius: "20px",
                    width: "100px",
                    color: "black",
                  }}
                />

                <input
                  type="reset"
                  id="reset"
                  value="Discard"
                  className="btn btn-secondary"
                  style={{
                    backgroundColor: "orange",
                    border: "none",
                    borderRadius: "20px",
                    width: "100px",
                    marginLeft: "70px",
                    color: "black",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default connect(
  (store) => ({
    path: store.walletPath,
  }),
  {}
)(EditProfile);
