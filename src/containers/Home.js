import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";

// style = {text-align: left;}

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      contacts: []
    };
  }


async componentDidMount(){

  try {
    const contacts = await this.contacts();
    console.log(contacts);
    this.setState({ contacts });
  } catch (e) {
    alert(e);
  }

  this.setState({ isLoading: false });

}

contacts(){
  return API.get("contacts","/todos");
}

  render() {
    return (
      <div className="Home">
        <div className="lander">
          {/* <h1></h1> */}
          <p className = "left">home</p>
        </div>
      </div>
    );
  }
}

