import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
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

        };
      }

    handleSubmit = async event =>{
        event.preventDefault();
        
        this.setState({isLoading: true});
        try {
            
          await this.createContact(
            {
              cName: this.state.cName,
              notes: this.state.notes
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

        <Form  onSubmit = {this.handleSubmit}>
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
                 inChange= {this.handleChange}
                 value={this.state.email}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                 inChange= {this.handleChange}
                 value={this.state.phone}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                 inChange= {this.handleChange}
                 value={this.state.type}
              />
            </Form.Group>
            
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="locations">
              <Form.Label>Locations</Form.Label>/>
              <Form.Control
                inChange= {this.handleChange}
                value={this.state.type} 
              />
            </Form.Group>
          </Form.Row>
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