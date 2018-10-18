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
          notes: null
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
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.cName}
                />
            </Form.Group>
            
            <Form.Group as={Col} controlId="notes">
              <Form.Label>Notes</Form.Label>
              <FormControl
                onChange={this.handleChange}
                value={this.state.notes}
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