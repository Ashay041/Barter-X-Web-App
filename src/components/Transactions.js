import React, {Component} from 'react' 
import {getTransactions,removeSuccess} from "../store/actions";
import {connect} from "react-redux"; 
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import SideNavPage from '../container/SideNavPage';
import NavbarPage from '../container/NavbarPage';
import Footer from '../container/Footer';
import "../App.css";
import { toast, ToastContainer } from 'react-toastify';
class Transactions extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:"",
            transactions: [
              
            ],
            wallet:{
              orgName:"Department1",
              org_aff:"org1",
              usr_id:"srush",
            } 
        }
    }
    async componentDidMount() {
      if(localStorage.wallet!==undefined){  
        let localStorageData=localStorage.wallet.split(",");
        const usrid=localStorageData[0];
        const orgName=localStorageData[1];
        const orgAff=localStorageData[2]; 
        const email=localStorageData[3];
        // console.log(email);
        let wallet={};
        wallet["usr_id"]=usrid;
        wallet["orgName"]=orgName;
        wallet["org_aff"]=orgAff;
        this.setState({wallet:wallet});
        const { getTransactions } = this.props;
        this.setState({username:usrid});
        // this.setState({emailID:email});
        // let wallet={};
        // wallet["usr_id"]=usrid;
        // wallet["orgName"]=orgName;
        // wallet["org_aff"]=orgAff;
        
        getTransactions("?user_id="+usrid+"&orgName="+orgName).then(() => this.loadData(this.props.transactions));
      
      }else{
      toast("Login first", {position: toast.POSITION.TOP_CENTER, autoClose: 1000});
        
      }
  
  }
    loadData(transaction) {
      console.log(transaction.username)
        this.setState({transactions:transaction.txids});
        this.setState({username:transaction.username});

    //    console.log(transaction)
       }
       componentWillUnmount() {
        const { removeSuccess } = this.props;
        removeSuccess();
      }

    expandInline(e) {
        if( e.target.parentElement.lastChild.style.display === "block"){
          e.target.parentElement.lastChild.style.display = "none";
        }else{
          e.target.parentElement.lastChild.style.display = "block";
        }
      // e.target.parentElement.lastChild.style.display = "block";
    }
    renderData(){
        if(this.state.transactions!==undefined){
          return this.state.transactions.map((product) => {
             //destructuring
            return (
              <div
                className="col-sm-6"
                key={product}
              >
                <div className="card" style={{margin:'5px'}}>
                  <div className="card-header">
                   {product}
                  </div>
                </div>
              </div>
            );
          });
        }else{
            return( 
                <span>
                <ErrorMessage />
               </span>);
        }
    }
    render() {  
      console.log(this.state)     
        return (
          <div className="page-container">
          <div className="content-wrap">
          <NavbarPage />
          <div className="container" style={{ height:'auto', width:'auto' }}>
          <h3 style={{color:"black"}}>Username : {this.state.username}</h3>
                <div className="row">
                {this.renderData()}
                    </div>
                    </div>
          </div>
          <div className="footer">
          <Footer/>
          </div>
          <ToastContainer/>
        </div>

            // <div>
            // <NavbarPage />
            // <div className="container-fluid">
            //     <div className="container" style={{ height:'auto', width:'auto' }}>
            //     <h3 >Username :{this.state.username}</h3>
            //     <div className="row">
            //     {this.renderData()}
            //         </div>
            //     </div>
            //     </div>
            //     <div>
            //     <Footer/>
            //     </div>
            //     </div>
        )
    }
}
    



export default connect((store)=>({
    transactions:store.pastTransaction,
}),{
    getTransactions,
    removeSuccess
})(Transactions);