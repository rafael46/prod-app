import React, { Component } from "react";
import { Form } from "semantic-ui-react";  // Button

// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import BootstrapTable  from 'react-bootstrap-table-next';
// import cellEditFactory from 'react-bootstrap-table2-editor';
// 
import {Button, Table} from 'semantic-ui-react'

// TableHeaderColumn
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./NewContact.css";
import { API } from "aws-amplify";
// import AddLocation from "../components/AddLocation";
// import { s3Upload } from "../libs/awsLib";

class AddItem extends React.Component{
  state ={
    address1: " ",
    address2:" ",
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  // 
  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({})
    this.props.handleAddLocationForm(this.state)
  }

  
         

  render(){
    return(
      <div>
      <Form onSubmit={e => {this.handleSubmit(e)}}>
        <Form.Row>
          <Form.Input label='Address--' placeholder='address1' name='address1' value={this.state.address1} onChange={this.handleChange}/>
          <Form.Input placeholder='Address 2' name='address2' value={this.state.address2} onChange={this.handleChange}/>
         
            <Button type="submit">add location</Button>
        </Form.Row>
      </Form>
      </div>
    );
  }

}
export default class NewContact extends Component {
    // constructor(props) {
      // super(props);   this.
        state = {
          isLoading: null,
          isDeleting: null,
          cname: " ",
          email: " ",
          phone: " ",
          deactivated: false,
          type: " ",
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

        // location = {
        //   address1: " ",
        //   address2:" ",
        //   "city": "Los Angeles",
        //   "state": "CA",
        //   "zipcode": "90021",
        //   "isDefault": false,
        // }
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

    handleChange = (e, {name, value}) => {
        this.setState({
          [name]: value
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
      e.preventDefault();
      let list_ = {...e.target.value};
      console.log("list_: "+ JSON.stringify(list_));
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
    // no ...
    let data1 = {...this.state.locations}; 
    console.log("data1: " + JSON.stringify(data1));
    return(
      <div className= "NewContact">

        <Form onSubmit = {this.handleSubmit}>
          
            <Form.Group>
              <Form.Input label='Name' placeholder='Name' name='cName' value={this.state.cName} onChange={this.handleChange}/>
              <Form.Input placeholder='Notes' name='notes' value={this.state.notes} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group>
            <Form.Input label='eMail' placeholder='eMail' name='email' value={this.state.email} onChange={this.handleChange}/>
              <Form.Input placeholder='phone' name='phone' value={this.state.phone} onChange={this.handleChange}/>

            </Form.Group>

            <Form.Group>
              <Form.Input label='Address' placeholder='address' name='address1' value={this.state.address1} onChange={this.handleChange}/>
              <Form.Input placeholder='Address 2' name='address2' value={this.state.address2} onChange={this.handleChange}/>

            </Form.Group>
            <Form onSubmit = {e => {this.handleAddLocationForm(e)}}>
              <Form.Input label='Address--' placeholder='address1' name='address1' value={this.state.address1} onChange={this.handleChange}/>
              <Form.Input placeholder='Address 2' name='address2' value={this.state.address2} onChange={this.handleChange}/>
              <button type="submit">add loc...</button>
            </Form>


          {/* address fields */}
          {/* address fields */}

          {/*  */}
          {/* <Button onClick={this.openForm}>add location</Button> */}

          {/* <Button  onClick={this.handleAddLocation}>Add Loc do no--</Button> */}
          {/* 44    callbackData*/}

          {/* < AddLocation value = {this.handleAddLocationForm}/> */}

         
          
          {/* 222 */}
          {/* Already handle by semantic ui */}
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
              text="Save."
              loadingText="Saving…"
            />
        </Form>

        {/* <AddItem value={this.handleAddLocationForm}/> */}

      </div>
    )
  }
}