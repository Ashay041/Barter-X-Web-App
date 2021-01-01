import React, { Component } from "react";
import "../styles/loginRegister.css";
import image from '../components/images/bartar.png'; 
import { MdError } from "react-icons/md";
import {createWallet,removeSuccess,removeError } from "../store/actions";
import { connect } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";


export class Register extends Component {
    state = {
    usr_id: "abc",
    orgName:"org1",
    org_aff:"department1",
    email:"",  
    password: "",
    confirmpassword: "",
    message: "",
    walletPath:"",
  };
  constructor(props) {
    super(props);
   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  loadData(path) {
   this.setState({walletPath:path});
   if(localStorage.wallet!==undefined){
    window.setTimeout(() => {
      this.props.history.push("/home");
      // history is available by design in this.props when using react-router
   }, 3000);    
   }
  }
  componentWillUnmount() {
    const { removeSuccess,removeError } = this.props;
    removeSuccess();
    removeError()
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmpassword) {
      var formData = new FormData(e.target);
      const data = {};
      data["org_aff"] = formData.get("affiliation") || this.state.org_aff;
      data["orgName"] = formData.get("orgname") || this.state.orgName;
      data["usr_id"] =formData.get("username") || this.state.usr_id;
      data["email"] =formData.get("email") || this.state.usr_id;
      const { createWallet } = this.props;
      createWallet(data).then(() => this.loadData(this.props.path));
      
    //   axios.post('http://127.0.0.1:8090/users/createWallet',data)
    //  .then(res => {
    //    if(res.status===200){
    //     console.log(res);
    //     toast(res.data.message ,{position: toast.POSITION.TOP_CENTER});
    //     alert(res.data.message);

    //     this.props.history.push('/home');
    //    }
    //  }).catch(error => {
    //   alert(error.message);
    //   });
    
    }  
  }
  handleConfirmPassword(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.password !== e.target.value) {
      this.setState({ message: "Passwords do not match!" });
    } else {
      this.setState({ message: "" });
    }
  }
  render() {
    return (
     
      <div>
     
     
     <div className="section">
      <span>
      <ErrorMessage />
      <SuccessMessage />
     </span>
      <div className="container">
      <div className="user" style={{borderRadius:"20%"}}>
      <div className="imgBx">
      <img src={image} alt="BaterX" />
      </div>
            <div className="formBx">
            <form onSubmit={this.handleSubmit}>
            <h2>Sign Up</h2>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  className="form-control input"
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="text"
                  name="affiliation"
                  placeholder="Affiliation"
                  autoComplete="off"
                  className="form-control input"
                  onChange={this.handleChange}
                  required
                />
                <input
                type="text"
                name="orgname"
                placeholder="Organisation Name"
                autoComplete="off"
                className="form-control input"
                  required
                  onChange={this.handleChange}
              />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="EmailId"
                  className="form-control input"
                  autoComplete="off"
                  required
                  onChange={this.handleChange}
                />
               
                <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id="individual" name="type" value="individual" defaultChecked/>
                <label className="custom-control-label" htmlFor="individual">Individual</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="organisation" name="type" value="organisation"/>
              <label className="custom-control-label" htmlFor="organisation">Organisation</label>
            </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control input"
                  autoComplete="off"
                  required
                  onChange={this.handleChange}
                  />
                  {this.state.message && (
                    <small className="text-danger">
                      <span className="mr-1">
                        <MdError
                          style={{ margin: -2, padding: -2 }}
                          color="crimson"
                        />
                      </span>
                      {this.state.message}
                    </small>
                  )}
                  <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  className="form-control input"
                  autoComplete="off"
                  required
                  onChange={this.handleConfirmPassword}
                  />
                  <input type="submit" value="SIGN UP" />
                  </form>
            </div>
            </div>
        </div>
        </div>
                    
       
        </div>
              );
            }
}

export default connect((store)=>({
  path:store.walletPath,
  user:store.currentUser,
}),{
  createWallet,removeSuccess,removeError
})(Register);
