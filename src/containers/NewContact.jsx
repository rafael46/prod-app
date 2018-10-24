import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel, Col  } from "react-bootstrap";  // Button
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BootstrapTable  from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// 
import {Button, Table} from 'semantic-ui-react'

// TableHeaderColumn
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewContact.css";
import { API } from "aws-amplify";
import AddLocation from "../components/AddLocation";
// import { s3Upload } from "../libs/awsLib";

const options = {
  noDataText: "No data found"
}

const columns = [{
  dataField: "address1",
  text: "Adress",
},
{
  dataField: "address2",
  text: "Adress 2",
},
{
  dataField: "city",
  text: "City",
},
{
  dataField: "state",
  text: "State",
},
{
  dataField: "zipcode",
  text: "Zip",
}];
export default class NewContact extends Component {
    // constructor(props) {
      // super(props);   this.
        state = {
          isLoading: null,
          isDeleting: null,
          cname: "",
          email: "",
          phone: "",
          deactivated: false,
          type: "",
          locations: [{address1:"1601-1",address2:"ste",city:"Los Angeles",state: "ca",zipcode: "9"}],
          notes: null,
          //
          address1: " ",
          address2:" ",
          city: "Los Angeles",
          state: " ",
          zipcode: " ",
          isDefault: false,
        };

        location = {
          address1: " ",
          address2:" ",
          "city": "Los Angeles",
          "state": "CA",
          "zipcode": "90021",
          "isDefault": false,
        }
    // } // constructor
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
    // Add location on this form   .... WORKS local form *************-----------------------
    handleAddLocation= () => {
       let list_copy = {address1: this.state.address1, address2: this.state.address2, city:this.state.city,state:this.state.state,zipcode:this.state.zipcode};
      // let list_copy = {...this.state.locations};

      let list2 = this.state.locations;
      list2.push(list_copy);
      this.setState({locations:list2})

    }
    //  Add location on subform
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
    let data1 = {...this.state.locations};
    console.log("data1: " + data1)
    

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
          {/* address fields */}
          {/* address fields */}
          <Form.Row>
            <Form.Group as={Col} controlId="address1">
              <Form.Label>Address-</Form.Label>
              <Form.Control
                onChange= {this.handleChange}
                value={this.state.address1} 
              />
            </Form.Group>
            <Form.Group as={Col} controlId="address2">
              <Form.Label>Address 2-</Form.Label>
              <Form.Control
                onChange= {this.handleChange}
                value={this.state.address2} 
              />
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
            <Form.Group  as={Col} controlId="city">
              <Form.Label>City+</Form.Label>
                <Form.Control
                  onChange= {this.handleChange}
                  value={this.state.city} 
                />
            </Form.Group>
          </Form.Row>
          {/*  */}
          <Button  onClick={this.handleAddLocation}>Add Loc do not</Button>
          {/* 44    callbackData*/}
          < AddLocation value = {this.handleAddLocationForm}/>
          {/* 222 */}
          <h5>Locations</h5>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Address 2</Table.HeaderCell>
                <Table.HeaderCell>City</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.locations.map((data,idx) =>
              <Table.Row key={idx}>
                <Table.Cell>{data.address1}</Table.Cell>
                <Table.Cell>{data.address2}</Table.Cell>
                <Table.Cell>{data.city}</Table.Cell>
                <Table.Cell>{data.state}</Table.Cell>
                <Table.Cell>{data.zipcode}</Table.Cell>
              </Table.Row>
              )

              }
            </Table.Body>
          </Table>
      


          {/* <BootstrapTable keyField="address1" data={[this.state.locations]} columns={columns} cellEdit={cellEditFactory({ mode: 'click'})} options={options}/> */}

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