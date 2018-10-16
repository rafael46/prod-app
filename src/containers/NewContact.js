import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
      <div className NewContact>
        <p>test </p>

        <form onSubmit = {this.handleSubmit}>
            <FormGroup controlId="cName">
              <FormControl
                onChange={this.handleChange}
                value={this.state.cName}
              />
            </FormGroup>
            <FormGroup controlId="notes">
              <FormControl
                onChange={this.handleChange}
                value={this.state.notes}
                
              />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
          </form>
      </div>
    )
  }
      
}