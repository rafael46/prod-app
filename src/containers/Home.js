import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import config from "../config";
import { ListGroup, ListGroupItem } from 'react-bootstrap';   //PageHeader,
// import { NavItem} from "react-bootstrap";   //  Nav,, NavDropdown, MenuItem 
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'

import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Dropdown from 'react-bootstrap/lib/Dropdown'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
  // , "Content-Type" : "application/json", "Accept" : "application/json"
  contacts(){
    const key = config.apiGateway.API_KEY;
    
    return API.get("contacts","/todos");
  }
// const options = `{ headers: { 'x-api-key': ${key}}}`;
    // let myInit = {
    //     headers: `{'x-api-key': ${key}}`
    // }

  handleContactClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }
  // {/* {"contact: y" + i } */}
  renderContactList(contacts){
    // i !== -1
    return [].concat(contacts).map(
      (contact,i) =>
        i !== -1
          ? <ListGroup.Item 
              key ={contact.cName} 
              href = {`/todo/${contact.cName}`}
              header={contact.cName} 
              onClick = {this.handleContactClick}>{contact.cName} 
            </ListGroup.Item>
          : <ListGroup.Item
              
              key="new"
              href="/todo/new"
              onClick={this.handleContactClick}
            >
            <h4>
                <b>{"\uFF0B"}</b> New Contact
            </h4>
          </ListGroup.Item>
    )  
  }
//  {/* <PageHeader>Contacts</PageHeader> */}
  renderContact(){
    return (
      <div className="contacts">
       
        <h3>Contacts</h3>
        <ListGroup>
          {!this.state.isLoading && this.renderContactList(this.state.contacts)}
        </ListGroup>
      </div>
    )
  }
// {/* <Navbar.Header> */}
//  {/* </Navbar.Header> */}
  navigation() {
    return(
      <div>
        <Navbar>
          <Navbar.Brand>
            <a href="#home">React-Bootstrap</a>
          </Navbar.Brand>
        <Nav>
          <Nav.Item eventKey={1} href="#">
            Link
          </Nav.Item>
          <Nav.Item eventKey={2} href="#">
            Link
          </Nav.Item>
        </Nav>
        </Navbar>
      </div>
    );
  }

//   <DropdownButton id="dropdown-item-button" title="Dropdown button">
//   <Dropdown.Item as="button">Action</Dropdown.Item>
//   <Dropdown.Item as="button">Another action</Dropdown.Item>
//   <Dropdown.Item as="button">Something else</Dropdown.Item>
// </DropdownButton>;
// <Dropdown.Menu show>
//   <Dropdown.Header>Dropdown header 1</Dropdown.Header>
//   <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
//   <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
// </Dropdown.Menu>;

// DropdownItem   {/* { this.navigation() } */}
  render() {
    return (
      <div className="Home">
        {this.renderContact()}
       
      </div>
    );
  }
}
