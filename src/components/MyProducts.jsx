import React, { Component } from "react";
import {
MdDelete,
MdFormatListBulleted,
MdViewAgenda,
} from "react-icons/md";
import Footer from "../container/Footer";
import   { removeSuccess,getIndexed,addSuccess ,removeError} from "../store/actions"
import { connect } from "react-redux";
class MyProductList extends Component {
  constructor(props) {
    super(props);
    //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      isLoading: true,
      products: [
      ],
    };
   
  }

  async componentDidMount() {
    let localStorageData=localStorage.wallet.split(",");
    const usrid=localStorageData[0];
    const orgName=localStorageData[1];
    const orgAff=localStorageData[2]; 
    const email=localStorageData[3];

    const { getIndexed }=this.props
    let data={};
    data["start_index"]="0";
    data["last_index"]="5";
    getIndexed("?user_id="+usrid+"&orgName="+orgName,data)
    .then(()=>{
      this.loadData(this.props.products)
    })
   
  }
  loadData(productlist) {
    this.setState({ products: productlist });
  }
  handleListView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  handleCardView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }
  }
  expandInline(e) {
      if( e.target.parentElement.lastChild.style.display === "block"){
        e.target.parentElement.lastChild.style.display = "none";
      }else{
        e.target.parentElement.lastChild.style.display = "block";
      }
    // e.target.parentElement.lastChild.style.display = "block";
  }

  renderCardData() {
    return this.state.products.map((product) => {
      const {
        id,
        name,
        resource_type_id,
        Price,
        Available,
        Owner
      } = product; //destructuring
      return (
        <div
          className="col-sm-4"
          key={id}
        >
          <div className="card my-2">
            <div className="card-header" onClick={this.expandInline.bind(this)}>
             {id}
              <span className="float-right">
              <span className="mx-1">
              
              </span>
              </span>
              <br />
              <small className="text-capitalize">Name: {name}</small>
            </div>
            <div className="card-body">
            <b> Category : </b>{resource_type_id}<br />
            <b> Status : </b>{Available}<br />
            <b> Owner Name : </b>{Owner}<br />
            <b> Price : </b>{Price}<br />
            
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
        <div className="page-container">
        <div className="content-wrap">
        <div className="container-fluid">
        <h4 className="mt-2">
               Product List
               <div className="float-right">
                  <div
                    className="btn-group btn-group-toggle btn-sm"
                    data-toggle="buttons"
                  >
                  <label
                      className="btn btn-secondary btn-sm"
                      onClick={this.handleListView}
                      >
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autoComplete="off"
                      />
                      <MdFormatListBulleted color="white" />
                    </label>
                    <label
                      className="btn btn-secondary active btn-sm"
                      onClick={this.handleCardView}
                    >
                    <input
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                      />
                      <MdViewAgenda color="white" />
                    </label>
                  </div>
                </div>
                </h4>
              <hr />
              <div className="row">{this.renderCardData()}</div>
            </div>
          </div>
          <div className="footer">
          <Footer />
          </div>
          </div>
    );
}
}

export default connect((store) => ({
  products:store.products,
  }),
  { removeSuccess,getIndexed,addSuccess ,removeError}
)(MyProductList);