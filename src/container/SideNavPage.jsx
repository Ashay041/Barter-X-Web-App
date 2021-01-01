// import React, { Component } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
// // import "../styles/SideNavPage.css";
// import Profile from "../components/Profile";
// import barter from "../components/images/bartar.png";
// import {
//   MdAddCircle,
//   MdPermIdentity,
//   MdMenu,
//   MdSearch,
//   MdUpdate,
//   MdCreditCard,
// } from "react-icons/md";
// class SideNavPage extends Component {
//   componentDidMount() {}
//   constructor(props) {
//     super(props);
//     this.state = {
//       active: "active",
//       buttonClass: "fa-arrow-right",
//     };
//     this.handleLogout = this.handleLogout.bind(this);
//     this.onClickToggle = this.onClickToggle.bind(this);
//   }
//   onClickToggle() {
//     if (this.state.active === "active") {
//       this.setState({ active: "" });
//       this.setState({ buttonClass: "fa-arrow-right" });
//     } else {
//       this.setState({ active: "active" });
//     }

//     // $(document).ready(function () {
//     //         $('#sidebar').toggleClass('active');
//     // });
//   }
//   handleLogout() {
//     const { logout } = this.props;
//     logout();
//   }
//   render() {
//     const activeNow = this.props.activeComponent;
//     return (
//       <div>
//         <div className="wrapper">
//           <nav
//             id="sidebar"
//             className={"navbar-dark bg-grey " + this.state.active}
//           >
//             <div className="sidebar-header" id="header">
//               <a href="/home" className="mt-2">
//                 {" "}
//                 <img src={barter} alt="logo" id="imglogo" />{" "}
//               </a>

//               {/*<strong>BarterX</strong>*/}
//             </div>

//             <ul className="list-unstyled components">
//               <Link to="/home">
//                 <li
//                   id="li"
//                   className={activeNow === "1" ? "sidenav-active" : ""}
//                 >
//                   <span className="mx-2">
//                     <MdPermIdentity />
//                   </span>
//                   Profile
//                 </li>
//               </Link>
//               <Link to="/products">
//                 <li
//                   id="li"
//                   className={activeNow === "2" ? "sidenav-active" : ""}
//                 >
//                   <span className="mx-2">
//                     <MdMenu />
//                   </span>
//                   All Products
//                 </li>
//               </Link>
//               <Link to="/productSettings">
//                 <li
//                   id="li"
//                   className={activeNow === "3" ? "sidenav-active" : ""}
//                 >
//                   <span className="mx-2">
//                     <MdUpdate />
//                   </span>
//                   Product Settings
//                 </li>
//               </Link>
//               <Link to="/Search">
//                 <li
//                   id="li"
//                   className={activeNow === "4" ? "sidenav-active" : ""}
//                 >
//                   <span className="mx-2">
//                     <MdSearch />
//                   </span>
//                   Search
//                 </li>
//               </Link>
//               <Link to="/Transactions">
//                 <li
//                   id="li"
//                   className={activeNow === "5" ? "sidenav-active" : ""}
//                 >
//                   <span className="mx-2">
//                     <MdCreditCard />
//                   </span>
//                   Previous Transactions
//                 </li>
//               </Link>
//               <Link to="/addproduct">
//                 <li
//                   id="li"
//                   className={activeNow === "6" ? "sidenav-active" : ""}
//                 >
//                   <span className="mx-2">
//                     <MdAddCircle />
//                   </span>
//                   Add New Product
//                 </li>
//               </Link>
//             </ul>
//           </nav>
//           <button
//             className="btn"
//             type="button"
//             id="sidebarCollapse"
//             onClick={this.onClickToggle}
//           >
//             <i className={"fa " + this.state.buttonClass}></i>
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default SideNavPage;
