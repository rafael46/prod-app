import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import config from "../config";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

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
  this.props.history.push(event.currentTarget.getAttribute("href"));
}
// {/* {"contact: " + i } */}
renderContactList(contacts){

  return [].concat(contacts).map(
    (contact,i) =>
      i !== -1
        ? <ListGroupItem 
            key ={contact.cName} 
            href = {`/todo/${contact.cName}`}
            header={contact.cName} 
            onClick = {this.handleContactClick}>
          </ListGroupItem>
        : <ListGroupItem
             key="new"
             href="/todo/new"
             onClick={this.handleContactClick}
          >
          <h4>
              <b>{"\uFF0B"}</b> New Contact
          </h4>
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

navigation() {
  return(
    <div>
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">React-Bootstrap</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">
          Link
        </NavItem>
        <NavItem eventKey={2} href="#">
          Link
        </NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      </Navbar>
    </div>
  );
}

  render() {
    return (
      <div className="Home">
        {this.renderContact()}
        { this.navigation() }
      </div>
    );
  }
}
