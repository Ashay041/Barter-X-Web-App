import React, { Component } from "react";
// import { showProfile } from "../store/actions";
import { connect } from "react-redux";
import profile from "../components/images/download.jpeg";
import "../styles/profile.css";
class Wallet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      emailID:"srushti@gmail.com",
      wallet:{
        orgName:"Department1",
        org_aff:"org1",
        usr_id:"srush",
      },
      balance:"",
      walletID:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    if(localStorage.wallet!=null){

      let localStorageData=localStorage.wallet.split(",");
      const usrid=localStorageData[0];
      const orgName=localStorageData[1];
      const orgAff=localStorageData[2]; 
      const email=localStorageData[3];
      // console.log(email);
      this.setState({emailID:email});
      let wallet={};
      wallet["usr_id"]=usrid;
      wallet["orgName"]=orgName;
      wallet["org_aff"]=orgAff;
      this.setState({wallet:wallet});

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
    cancelButton.disabled=!cancelButton.disabled;

    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }

  render() {
    return (
            <div className="container-fluid mt-2">
            <div className="row">
            <div className="col-2">
            <img src={profile} alt="ProfileImage"  style={{height:"200px",width:"200px",borderRadius:"50%"}} />
            </div>
            <div className="col-5" style={{}}>
            <label>
            Username 
            </label>
            <input
            readOnly
                type="text"
                name="username"
                id="username"
                placeholder={this.state.wallet.usr_id}
                className="form-control input"
                style={{backgroundColor:"white"}}
              />
              <label>
            Organisation Name: 
            </label>
              <input
              readOnly
              type="text"
              name="username"
              id="username"
              placeholder={this.state.wallet.org_aff}
              style={{backgroundColor:"white"}}
                className="form-control input"
                />
                <label>
            Affiliation Name:  
            </label>
                <input
                readOnly
                type="text"
                name="username"
                id="username"
                placeholder={this.state.wallet.orgName}
                className="form-control input"
                style={{backgroundColor:"white"}}
                />
                <label>
              Wallet ID:  
                </label>
                    <input
                    readOnly
                    type="text"
                    name="wallet"
                    id="wallet"
                    placeholder={this.state.walletID}
                    className="form-control input"
                    style={{backgroundColor:"white"}}
                    />
                    <label>
                   Balance:
                      </label>
                          <input
                          readOnly
                          type="text"
                          name="balance"
                          id="balance"
                          placeholder={this.state.balance}
                          className="form-control input"
                          style={{backgroundColor:"white"}}
                          />
                </div>  
                </div>
                </div>
                );
            }
        }
        
export default connect((store)=>({
  path:store.walletPath
}),{

})(Wallet);
