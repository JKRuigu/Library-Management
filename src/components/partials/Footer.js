import React from "react";
import {link} from "react-router";

class Footer extends React.Component {
  render(){
    return(
      <div className="footer ">
        <div className="container-fluid">
                &copy;
                2018,Powered by
                <span> MagnumDigitalMediaKe </span>
                version:1.0.0
        </div>
      </div>
    )
  }
}

export default Footer;
