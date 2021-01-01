import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeSuccess,
  addSuccess,
  storeProduct,
  removeError,
} from "../store/actions";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import Footer from "../container/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        productID: "",
        name: "",
        category: "",
        status: false,
        owner: "",
        price: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillUnmount() {
    const { removeError, removeSuccess } = this.props;
    removeSuccess();
    removeError();
  }
  handleSubmit(event) {
    event.preventDefault();
    const { storeProduct } = this.props;
    var formData = new FormData(event.target);
    const data = {};
    if (localStorage.wallet !== undefined) {
      let localStorageData = localStorage.wallet.split(",");
      const usrid = localStorageData[0];
      const orgName = localStorageData[1];
      const orgAff = localStorageData[2];
      const email = localStorageData[3];

      data["productID"] =
        formData.get("productid") || this.state.data.productid;
      data["name"] = formData.get("productname") || this.state.data.productname;
      data["category"] = formData.get("category") || this.state.data.category;
      data["status"] = formData.get("status") || this.state.data.status;
      data["owner"] = formData.get("owner") || this.state.data.owner;
      data["price"] = formData.get("price") || this.state.data.price;

      storeProduct("?user_id=" + usrid + "&orgName=" + orgName, data);
    } else {
      toast("Login first", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    //   window.setTimeout(() => {
    //     window.location.reload(false);
    //  }, 5000);
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container-fluid">
            <div className="container-fluid">
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <hr />
                  <div className="container-fluid">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Product ID:
                        <input
                          required
                          type="text"
                          name="productid"
                          id="productid"
                          className="form-control"
                          placeholder="eg. 00X5A4"
                        />
                      </div>
                      <div className="col-sm-6">
                        Product Name:
                        <input
                          required
                          type="text"
                          name="productname"
                          id="productname"
                          placeholder="eg. Samsung"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Category:
                        <input
                          required
                          type="text"
                          name="category"
                          id="category"
                          placeholder="eg. Electronics"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Status:
                        <select
                          id="status"
                          name="status"
                          className="form-control"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Owner:
                        <input
                          required
                          type="text"
                          name="owner"
                          id="owner"
                          placeholder="eg. John"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Price:
                        <input
                          required
                          type="text"
                          name="price"
                          id="price"
                          placeholder="eg. John"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="text-right">
                    <button
                      className="btn mx-2 hover"
                      style={{ borderRadius: "15px", background: "orange" }}
                      type="reset"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      style={{ borderRadius: "15px", background: "orange" }}
                      className="btn hover"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              }
              <span className="mt-2">
                <ErrorMessage />
                <SuccessMessage />
              </span>
            </div>
          </div>
          <ToastContainer />
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect((store) => ({}), {
  removeSuccess,
  storeProduct,
  addSuccess,
  removeError,
})(AddProduct);
