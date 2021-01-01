import React, { Fragment } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
const SuccessMessage = ({ success }) => (
  <Fragment>
    {success.message && (
      <div>       
      <span id="err" className="alert alert-success mx-3">
      
      {" "}
   
      {success.message}
      </span>
      </div>
    )}
  </Fragment>
);

export default connect((store) => ({ success: store.success }))(SuccessMessage);
