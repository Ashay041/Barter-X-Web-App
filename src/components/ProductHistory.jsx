import React, { Component } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../container/Footer";
import {
  getProductHistory,
  removeError,
  removeSuccess,
} from "../store/actions";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ProductHistory extends Component {
  constructor(props) {
    super(props);
    //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      isLoading: true,
      showMessage: false,
      showMessageHistory: false,
      emailID: "",
      pid: "",
      wallet: {
        orgName: "",
        org_aff: "",
        usr_id: "",
      },
      productsHistory: [
        {
          TxId: "",
          Value: {
            id: "",
            name: "",
            resource_type_id: "",
            Available: "",
            Owner: "",
            Price: "",
          },
          Timestamp: "",
          IsDelete: "",
        },
      ],
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
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    let data = {};
    data["productID"] = formData.get("pid") || null;

    const { getProductHistory } = this.props;
    if (data.productID != null) {
      this.setState({ pid: data.productID });
    }
    let localStorageData = localStorage.wallet.split(",");
    const usrid = localStorageData[0];
    const orgName = localStorageData[1];

    // axios.get('http://127.0.0.1:8090/products/getProductHistory',data)
    //  .then(res => {
    //    if(res.status===200){
    //     console.log(res);
    //     alert(res.data.message);
    //    }
    //  }).catch(error => {
    //   alert(error.message);
    //   });
    console.log(data);

    getProductHistory(
      "?user_id=" + usrid + "&orgName=" + orgName,
      data
    ).then(() => this.loadData(this.props.productHistory));
  }
  loadData(productlist) {
    console.log(productlist);
    this.setState({ productsHistory: productlist });
    this.setState({ showMessage: true });
  }
  componentWillUnmount() {
    const { removeSuccess, removeError } = this.props;
    removeSuccess();
    removeError();
  }

  expandInline(e) {
    if (e.target.parentElement.lastChild.style.display === "block") {
      e.target.parentElement.lastChild.style.display = "none";
    } else {
      e.target.parentElement.lastChild.style.display = "block";
    }
    // e.target.parentElement.lastChild.style.display = "block";
  }

  renderCardData() {
    return this.state.productsHistory.map((product) => {
      const { TxId, Value, Timestamp, IsDelete } = product; //destructuring
      return (
        <div className="col-sm-4" key={Value.id}>
          <div className="card my-2">
            <div className="card-header" onClick={this.expandInline.bind(this)}>
              {Value.id}
              <span className="float-right">
                <span className="mx-1"></span>
              </span>
              <br />
              <small className="text-capitalize">Name: {Value.name}</small>
            </div>
            <div className="card-body">
              <b> Owner Name : </b>
              {Value.Owner}
              <br />
              <b> Category : </b>
              {Value.resource_type_id}
              <br />
              <b> Status : </b>
              {Value.Available}
              <br />
              <b> Owner Name : </b>
              {Value.Owner}
              <br />
              <b> Price : </b>
              {Value.Price}
              <br />
              <b> Timestamp : </b>
              {Timestamp}
              <br />
              <b> Is Delete : </b>
              {IsDelete}
              <br />
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
            {
              <div>
                Enter product Id :
                <form id="form" onSubmit={this.handleSubmit}>
                  <div className="form-row my-2">
                    <div className="col-sm-6">
                      <input
                        required
                        type="text"
                        name="pid"
                        id="pid"
                        placeholder="Product Id"
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6">
                      <button
                        type="submit"
                        className="btn btn-dark btn-sm mx-2"
                        //   onClick={this._showMessage(true,this.state.username)}
                      >
                        Get Information
                      </button>
                    </div>
                  </div>
                </form>
                <hr />
              </div>
            }

            {this.state.showMessage && (
              <div className="row">{this.renderCardData()}</div>
            )}
            <span className="mt-2">
              <ErrorMessage />
            </span>
          </div>
        </div>
        <ToastContainer />
        <div className="footer">
          <Footer />
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
  {
    getProductHistory,
    removeError,
    removeSuccess,
  }
)(ProductHistory);
