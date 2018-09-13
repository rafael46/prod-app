import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import config from "../config";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

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
  const key = config.apiGateway.API_KEY;
  const options = `{ headers: { 'x-api-key': ${key}}`;
  return API.get("contacts","/todos",options);
}

handleContactClick = (event) => {
  event.preventDefault();

}
// {/* {"contact: " + i } */}
renderContactList(contacts){
  return [].concat(contacts).map(
    (contact,i) =>
      <ListGroupItem 
        key ={contact.cName} 
        href = {`/todo/${contact.cName}`}
        header={contact.cName} 
        onClick = {this.handleContactClick}>
        
      </ListGroupItem>
  )  
}

renderContact(){
  return (
    <div className="contacts">
      {/* <PageHeader>Contacts</PageHeader> */}
      <h3>Contacts</h3>
      <ListGroup>
        {!this.state.isLoading && this.renderContactList(this.state.contacts)}
      </ListGroup>
    </div>
  )
}

  render() {
    return (
      <div className="Home">
        {this.renderContact()}
      </div>
    );
  }
}

