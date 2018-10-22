import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewContact.css";
import { API } from "aws-amplify";
// import { s3Upload } from "../libs/awsLib";

export default class NewContact extends Component {
    constructor(props) {
      super(props);
        this.state = {
          isLoading: null,
          isDeleting: null,
          cname: "",
          email: "",
          phone: "",
          deactivated: false,
          type: "",
          locations: [],
          notes: null,
          //
          address1: "",
          address2:"",
          "city": "Los Angeles",
          "state": "",
          "zipcode": "",
          "isDefault": false,
        };

        this.location = {
          address1: "",
          address2:"",
          "city": "Los Angeles",
          "state": "CA",
          "zipcode": "90021",
          "isDefault": false,
        }
    }
    //  console.log("location1::: " + location);

    handleSubmit = async event =>{
        event.preventDefault();
        
        this.setState({isLoading: true});
        try {
            
          await this.createContact(
            {
              // cName: this.state.cName,
              // notes: this.state.notes
              ...this.state,
          });
    
          this.props.history.push("/");
        } catch (e) {
          alert(e);
          this.setState({ isLoading: false });
        }
      }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    handleAddList = list => {

      let list_ = this.state.locations;
      list_.push(list);
      this.setState({locations:list_})
    }

    handleAddLocation= () => {
      let list_ = {address1: this.state.address1, address2: this.state.address2};
      let list2 = this.state.locations;
      list2.push(list_);
      this.setState({locations:list2})

    }

    handleAddLocationForm = e => {
      let list_ = {...e.target.value};
      let list2 = this.state.locations;
      list2.push(list_);
      this.setState({locations:list2})

    }
// this.location.address1
    handelChangeLocation = event => {

        // {[event.target.id]: event.target.value}
    }

    // , `/todos/${this.props.match.params.id}`,
    createContact(contact) {
      console.log(contact)
      return API.post("contacts", "/todos", {
        body: contact
      });
    }

  render(){
    return(
      <div className= "NewContact">

        <Form onSubmit = {this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} className= "Field" controlId="cName">
              <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.cName}
                />
            </Form.Group>
            
            <Form.Group as={Col} controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={this.state.notes}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label>eMail</Form.Label>
              <Form.Control
                 onChange= {this.handleChange}
                 value={this.state.email}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                 onChange= {this.handleChange}
                 value={this.state.phone}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                 onChange= {this.handleChange}
                 value={this.state.type}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="address1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange= {this.handleChange}
                value={this.state.address1} 
              />
            </Form.Group>
            <Form.Group as={Col} controlId="address2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                onChange= {this.handleChange}
                value={this.state.address2} 
              />
            </Form.Group>
            <Button onClick={this.handleAddLocation}>Add Loc</Button>
          </Form.Row>
          {/* options={options} */}
          <h5>Locations</h5>
          <BootstrapTable data={this.state.locations}
          
            >
            <TableHeaderColumn dataField="address1" isKey dataAlign="left">Address</TableHeaderColumn>
            <TableHeaderColumn dataField="address2" isKey dataAlign="left">Address 2</TableHeaderColumn>



          </BootstrapTable>

            {/* 1 bsStyle="primary" bsSize="small" */}
            <LoaderButton
              block
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
        </Form>
      </div>
    )
  }
}