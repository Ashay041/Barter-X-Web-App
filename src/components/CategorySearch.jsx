import React, { Component } from "react";
import Array from "./Array";
import Footer from "../container/Footer";
import { getCategory, removeError } from "../store/actions";
import NavbarPage from "../container/NavbarPage";
import { connect } from "react-redux";
import phone from "../components/images/phone.jpg";
import ErrorMessage from "./ErrorMessage";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from "reactstrap";
class CategorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      products: [
        {
          id: "741258",
          name: "Samsung Phone",
          resource_type_id: "Electronics",
          Price: "15000",
          Owner: "Srushti",
        },
      ],
    };
    this.renderCardData = this.renderCardData.bind(this);
  }
  async componentDidMount() {
    let array = window.location.href.split("?");
    const category = array[1];
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
      const { getCategory } = this.props;

      getCategory(
        "?user_id=" + usrid + "&orgName=" + orgName + "&category=" + category
      ).then(() => this.loadData(this.props.productHistory));
    }
  }
  componentWillUnmount() {
    const { removeError } = this.props;
    removeError();
  }

  loadData(productlist) {
    console.log(productlist);
    this.setState({ products: productlist });
    console.log(this.state.products);
    this.setState({ isload: true });
  }

  renderCardData() {
    return this.state.products.map((product) => {
      const { id, name, resource_type_id, Owner, Price } = product; //destructuring
      return (
        <Card key={id} style={{ margin: "20px" }}>
          <CardBody>
            <CardTitle>
              <b>Product Name : </b>
              {name}
            </CardTitle>
            <CardSubtitle>
              <b>category : </b>
              {resource_type_id}
            </CardSubtitle>
          </CardBody>
          <CardImg
            src={phone}
            alt=""
            style={{ height: "170px", padding: "20px" }}
          />
          <CardBody>
            <CardText style={{ color: "black" }}>
              <b>Owner : </b>
              {Owner}
            </CardText>
            <CardText style={{ color: "black" }}>
              {/*  <b>Available : </b>
            Available*/}
            </CardText>
            <CardText style={{ color: "black" }}>
              <b>Price : </b>
              {Price}
            </CardText>
            <button className="btn btn-primary mx-2">BUY</button>
            <button className="btn btn-primary mx-2">Barter</button>
          </CardBody>
        </Card>
      );
    });
  }

  UpdateSearch(event) {
    this.setState({ isLoading: false });
    this.setState({ search: event.target.value.substr(0, 10) });
  }

  render() {
    let filtered = this.state.products.filter((product) => {
      return product.name.indexOf(this.state.search) !== -1;
    });

    const arr = filtered.map((product, index) => {
      return (
        <Array
          key={product.productId}
          name={product.name}
          category={product.resource_type_id}
          price={product.Price}
          owner={product.Owner}
          // status = {product.status}
          // productDescription = {product.productDescription}
        />
      );
    });

    return (
      <div className="page-container">
        <div className="content-wrap">
          <NavbarPage />
          <div className="container-fluid">
            {/* <input type="text" value={this.state.search} onChange={this.UpdateSearch.bind(this)} /> */}
            <input
              type="text"
              value={this.state.search}
              onChange={this.UpdateSearch.bind(this)}
              placeholder="Enter Product Name.."
              style={{
                width: "30%",
                height: "6%",
                borderRadius: "10px",
                marginLeft: "35%",
                marginRight: "35%",
                marginTop: "2%",
                padding: "1% 1%",
              }}
            />
            <div
              className=""
              style={{ marginTop: "3%", height: "auto", width: "auto" }}
            >
              <div
                className="container"
                style={{ height: "auto", width: "auto" }}
              >
                <div className="row" style={{ marginTop: "3%" }}>
                  {this.state.isLoading && this.renderCardData()}
                  {arr}
                </div>
              </div>
            </div>
          </div>
        </div>
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
    getCategory,
    removeError,
  }
)(CategorySearch);
