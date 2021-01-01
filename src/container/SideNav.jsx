// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// // import '../styles/sidenav.css'
// import {
//   MdAddCircle,
//   MdPermIdentity,
//   MdMenu,
//   MdSearch,
//   MdUpdate,
//   MdCreditCard,
// } from "react-icons/md";
// import barter from "../components/images/bartar.png";

// class Sidenav extends Component {
//   componentDidMount() {
//     // (function($) {
//     //     "use strict";
//     //     var fullHeight = function() {
//     //         $('.js-fullheight').css('height', $(window).height());
//     //         $(window).resize(function(){
//     //             $('.js-fullheight').css('height', $(window).height());
//     //         });
//     //     };
//     //     fullHeight();
//     //     $('#sidebarCollapse').on('click', function () {
//     //       $('#sidebar').toggleClass('active');
//     //   });
//     // })(jQuery);
//   }
//   constructor(props) {
//     super(props);
//     this.handleLogout = this.handleLogout.bind(this);
//   }
//   handleLogout() {
//     const { logout } = this.props;
//     logout();
//   }
//   state = {};
//   render() {
//     const activeNow = this.props.activeComponent;
//     return (
//       <div>
//         <div className="sidenav">
//           <div
//             className="collapsible-body navbar-collapse"
//             id="navbarSupportedContent"
//           >
//             <a href="/home" className=" mt-2">
//               <img
//                 src={barter}
//                 alt="logo"
//                 style={{
//                   width: "150px",
//                   height: "50px",
//                   marginLeft: "20px",
//                   marginTop: "10px",
//                 }}
//                 className="img"
//               />
//             </a>
//             {/*<h4 className="text-dark text-center mt-2 ">BaterX</h4>*/}
//             <hr />
//             <p className="mt-4">
//               <u> Menu</u>
//             </p>
//             <ul id="ul">
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
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Sidenav;
