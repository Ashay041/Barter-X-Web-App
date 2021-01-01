import React, { Component } from "react";
import Array from './Array'
import Footer from "../container/Footer";
import NavbarPage from "../container/NavbarPage";
import { connect } from "react-redux";
import   { getIndexed} from "../store/actions"

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            products: [  
                {
                    id:"741258",
                    name:"Samsung Phone",
                    resource_type_id:"Electronics",
                    Price:"15000",
                    Owner:"Srushti"
                }
                           
            ]
        };
    }
    async componentDidMount() {
     if(localStorage.wallet!==undefined){

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
        
    }else{
        // alert("Login first");
    }
}
    loadData(productlist) {
        this.setState({ products: productlist });
        console.log(productlist);
      }
    UpdateSearch(event) {
        this.setState({search: event.target.value.substr(0,10)});
    }

    render() {
        let filtered = this.state.products.filter(
            (product) => {
                return product.name.indexOf(this.state.search) !== -1;
            }
        );

        const arr = filtered.map((product, index) => {
            return <Array key={product.id}
            name= {product.name}
            category = {product.resource_type_id}
            price={product.Price}
            owner={product.Owner}

            // status = {product.status}
            // productDescription = {product.productDescription} 
            />
        })
        return (

            <div className="page-container">
            <div className="content-wrap">
            <NavbarPage />
            <div className="container-fluid">
                {/* <input type="text" value={this.state.search} onChange={this.UpdateSearch.bind(this)} /> */}
                <input type="text" value={this.state.search} onChange={this.UpdateSearch.bind(this)} placeholder="Enter Product Name.." style={{width:'30%', height:'6%', borderRadius:'10px', marginLeft:'35%',marginRight:'35%', marginTop:'2%', padding:'1% 1%'}}/>             
                <div className="" style={{ marginTop:'1%', height:'auto', width:'auto' }}>
                <div className="container" style={{ height:'auto', width:'auto' }}>
                    <div className="row" style={{marginTop:'1%', height:'auto', width:'auto'}} >
                    {arr} 
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div className="footer">
            <Footer/>
            </div>
          </div>

        )
    }
}

export default connect((store) => ({
    products:store.products,
    }),
    { getIndexed}
  )(Search);
  
