import React, { Component, useState } from "react";
import { Card, CardTitle, Button, CardBody, CardText } from "reactstrap";
import {
  readProduct,
  updateProduct,
  removeSuccess,
  removeError,
} from "../store/actions";
import { connect } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import SideNavPage from "../container/SideNavPage";
import Footer from "../container/Footer";

class UpdateDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showMessage: false,

      emailID: "",
      pid: "",
      wallet: {
        orgName: "",
        org_aff: "",
        usr_id: "",
      },
      product: {
        id: "",
        Available: "",
        name: "",
        AvailableOwner: "",
        Price: "",
        resource_type_id: "",
      },
    };
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
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
    }
  }

  handleSubmitUpdate(event) {
    event.preventDefault();
    const { updateProduct } = this.props;
    var formData = new FormData(event.target);
    var cancelButton = document.getElementById("cancelBtn");
    cancelButton.disabled = !cancelButton.disabled;
    var deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.disabled = !cancelButton.disabled;
    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";

    let data = {};
    let body = {};
    data["productID"] = this.state.pid || null;
    data["name"] = formData.get("name") || this.state.product.name;
    data["category"] =
      formData.get("category") || this.state.product.resource_type_id;
    data["status"] = formData.get("available") || this.state.product.Available;
    data["ID"] = formData.get("ID") || this.state.product.id;
    data["Available"] =
      formData.get("available") || this.state.product.Available;
    data["Category"] =
      formData.get("category") || this.state.product.resource_type_id;
    data["Owner"] = formData.get("owner") || this.state.product.Owner;
    data["Price"] = formData.get("price") || this.state.product.Price;
    if (data.ID !== this.state.product.id) {
      body["index"] = "1";
      body["value"] = data.ID;
    } else if (data.name !== this.state.product.name) {
      body["index"] = "3";
      body["value"] = data.name;
    } else if (data.category !== this.state.product.resource_type_id) {
      body["index"] = "2";
      body["value"] = data.category;
    } else if (data.Available !== this.state.product.Available) {
      body["index"] = "4";
      body["value"] = data.Available;
    } else if (data.Owner !== this.state.product.Owner) {
      body["index"] = "5";
      body["value"] = data.Owner;
    } else if (data.Price !== this.state.product.Price) {
      body["index"] = "6";
      body["value"] = data.Price;
    }
    body["productID"] = this.state.pid || null;

    updateProduct(
      "?user_id=" +
        this.state.wallet.usr_id +
        "&orgName=" +
        this.state.wallet.orgName,
      body
    ).then(() => {
      window.setTimeout(() => {
        var form = document.getElementById("form1");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].readOnly = !elements[i].readOnly;
        }
        const { removeError, removeSuccess } = this.props;
        removeSuccess();
        removeError();
      }, 3000);
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    const id = formData.get("pid") || null;
    const { readProduct } = this.props;
    if (id != null) {
      this.setState({ pid: id });
    }
    readProduct(
      "?user_id=" +
        this.state.wallet.usr_id +
        "&orgName=" +
        this.state.wallet.orgName +
        "&productID=" +
        id
    ).then(() => this.loadData(this.props.product));
  }

  handleClick(username) {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      alert("deleted");
    }
  }

  loadData(productD) {
    console.log(productD);
    console.log(productD);
    let obj = JSON.parse(productD);
    console.log(obj);
    this.setState({ product: obj });
    this.setState({ showMessage: true });
  }

  editform() {
    var form = document.getElementById("form1");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = !elements[i].readOnly;
    }
    var cancelButton = document.getElementById("cancelBtn");
    cancelButton.disabled = !cancelButton.disabled;
    var deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.disabled = !cancelButton.disabled;
    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }
  componentWillUnmount() {
    const { removeSuccess, removeError } = this.props;
    removeSuccess();
    removeError();
  }
  render() {
    return (
      <div>
        <div className="wrapper ">
          <div className="container-fluid">
            <div className="container-fluid">
              {
                <div>
                  Enter product Id to delete/update :
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
                  <div>
                    {this.state.showMessage && (
                      <div>
                        <form id="form1" onSubmit={this.handleSubmitUpdate}>
                          <div className="alert alert-info">
                            Click <strong>Edit</strong> to fill in the details
                            and <strong>Update</strong> the information :
                          </div>
                          <hr />
                          <Card>
                            <CardBody>
                              <CardTitle className="card-header">
                                {/*<h4>{this.state.products.name}</h4>*/}

                                {this.state.product.id}
                              </CardTitle>

                              <table
                                className="table-borderless table-hover table-sm"
                                style={{ color: "black", width: "auto" }}
                              >
                                <tbody>
                                  <tr>
                                    <td>ID</td>
                                    <td>
                                      <input
                                        readOnly
                                        type="text"
                                        name="ID"
                                        id="ID"
                                        placeholder={this.state.product.id}
                                        className="form-control border-0"
                                        style={{ background: "#ffffff" }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Name</td>
                                    <td>
                                      <input
                                        readOnly
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder={this.state.product.name}
                                        className="form-control border-0"
                                        style={{ background: "#ffffff" }}
                                      />
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Availability</td>
                                    <td>
                                      <input
                                        readOnly
                                        type="text"
                                        name="available"
                                        id="available"
                                        placeholder={
                                          this.state.product.Available
                                        }
                                        className="form-control border-0"
                                        style={{ background: "#ffffff" }}
                                      />
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Category</td>
                                    <td>
                                      <input
                                        readOnly
                                        type="text"
                                        name="category"
                                        id="category"
                                        placeholder={
                                          this.state.product.resource_type_id
                                        }
                                        className="form-control border-0"
                                        style={{ background: "#ffffff" }}
                                      />
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Owner</td>
                                    <td>
                                      {" "}
                                      <input
                                        readOnly
                                        type="text"
                                        name="owner"
                                        id="owner"
                                        placeholder={this.state.product.Owner}
                                        className="form-control border-0"
                                        style={{ background: "#ffffff" }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Price</td>
                                    <td>
                                      {" "}
                                      <input
                                        readOnly
                                        type="text"
                                        name="price"
                                        id="price"
                                        placeholder={this.state.product.Price}
                                        className="form-control border-0"
                                        style={{ background: "#ffffff" }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="text-right">
                                <button
                                  type="button"
                                  id="editButton"
                                  className="btn btn-secondary"
                                  onClick={this.editform}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-light mx-2"
                                  type="reset"
                                >
                                  Reset
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  id="cancelBtn"
                                  disabled
                                >
                                  Update Product
                                </button>
                                <Button
                                  className="btn btn-danger btn-sm mx-2"
                                  id="deleteBtn"
                                  onClick={() =>
                                    this.handleClick(this.state.products._id)
                                  }
                                >
                                  Delete
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              }
              <span>
                <ErrorMessage />
                <SuccessMessage />
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default connect(
  (store) => ({
    product: store.currentProduct,
    productHistory: store.productHistory,
  }),
  {
    removeSuccess,
    removeError,
    readProduct,
    updateProduct,
  }
)(UpdateDelete);
