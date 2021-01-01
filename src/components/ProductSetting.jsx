import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardTitle, CardBody } from "reactstrap";
import NavbarPage from "../container/NavbarPage";
import Footer from "../container/Footer";
import { Tab,Tabs, TabList, TabPanel } from 'react-tabs';
import ViewProfile from "./ViewProfile ";
import EditProfile from "./EditProfile";
import 'react-tabs/style/react-tabs.css';
import MyProductList from "./MyProducts";
import AddProduct from "./AddProduct";
import UpdateDelete from "./UpdateDelete";
import ProductHistory from "./ProductHistory";

class ProductSetting extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
      <NavbarPage /> 
      <Tabs>
      <TabList>
      {/*<Tab>My Products</Tab>*/  }
      <Tab>Add Product</Tab>  
      <Tab>Update/Delete Product</Tab>        
      <Tab>Product History</Tab>        
      </TabList>
     {/* <TabPanel>
      <MyProductList />      
     </TabPanel>*/}
      <TabPanel>
      <AddProduct />      
      </TabPanel>
      <TabPanel>
      <UpdateDelete />      
      </TabPanel>
      <TabPanel>
      <ProductHistory />      
      </TabPanel>
      </Tabs>
      </div>
          );
  }
}

export default connect((store)=>({
  path:store.walletPath
}),{

})(ProductSetting);
