import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
// import { Nav, Navbar, NavItem } from 'reactstrap';
// import "./App.css";
import './css/Example.css';
// import './css/index.css';
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import Navigation from './components/Navigation'

//{/* <Navbar.Header> */}
// {/* </Navbar.Header> */}
// <Link to="/todo/new">Prod App</Link>
class App extends Component {
  // <div className="App container">
  render() {
    return (
      <div className="App container">
       <div>

        <Navigation />
       
        <Navbar fluid collapseOnSelect>
          
          <Navbar.Brand>
              <Link to="/">Prod App</Link>
          </Navbar.Brand>

          <Navbar.Toggle />
         
          <Navbar.Collapse>
            <Nav pullRight>
            <LinkContainer to="/signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <Routes />
        
      </div>
      </div>
    );
  }
}

export default App;


//  {/* <NavItem href="/signup">Signup</NavItem> */}
// {/* <NavItem href="/login">Login</NavItem> */}