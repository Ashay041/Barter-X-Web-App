import React, { Component } from "react";
import "../styles/buytoken.css";
import image from '../components/images/bartar.png'; 
import { MdError } from "react-icons/md";
import {createWallet,removeSuccess,removeError } from "../store/actions";
import { connect } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import NavbarPage from "../container/NavbarPage";


export class BuyTokens extends Component {
    state = {
        number:"",
        tokensamount:"",
        total:""
  };
  constructor(props) {
    super(props);
   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // var formData = new FormData(e.target);      
    const num = e.target.value ;
    const amount= 1000;
    const total=num*amount;
    document.getElementById("total").placeholder = total;
  }
  loadData(path) {
  
  }
  componentWillUnmount() {
    const { removeSuccess,removeError } = this.props;
    removeSuccess();
    removeError()
  }

  handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);   
    

  }
  render() {
    return (
     
      <div>
     <NavbarPage />     
     <div className="section1">
      <span>
      <ErrorMessage />
      <SuccessMessage />
     </span>
      <div className="container1">
      <div className="user1" style={{borderRadius:"20%"}}>
            
            <div className="formBx1">
            <form onSubmit={this.handleSubmit}>
            <img src={image} alt="BarterX" style={{}}/>
            <h2>Details</h2>
                <input
                  type="text"
                  name="number"
                  placeholder="Number of Tokens"
                  autoComplete="off"
                  className="form-control input"
                  onChange={this.handleChange}
                  required
                />
                Token Amount
                <input
                disabled
                  type="text"
                  name="tokensamount"
                  placeholder="1000"
                  autoComplete="off"
                  className="form-control input"
                  onChange={this.handleChange}
                  required
                />
                Total Amount
                <input
                disabled
                  type="text"
                  name="total"
                  id="total"
                  placeholder="0"
                  autoComplete="off"
                  className="form-control input"
                />
                 
                  <input type="submit" value="Proceed To Pay" />
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
})(BuyTokens);
