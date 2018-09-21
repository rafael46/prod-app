import React, { Component } from 'react';
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./EditContact.css";

// import { s3Upload } from "../libs/awsLib";

export default class EditContact extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
          isLoading: null,
          isDeleting: null,
          cName: null,
          notes: null
      };
    }

    async componentDidMount(){
    try {
        const contact = await this.getContact();
        console.log("contact get::: " + JSON.stringify(contact));
        const { cName, notes} = contact;

        this.setState({
            cName,
            notes
        })

    } catch(e){
        alert(e);
    }

    }

    getContact(){
        const key = config.apiGateway.API_KEY;
        const options = `{ headers: { 'x-api-key': ${key}}`;
        console.log("API get:----: "+this.props.match.params.id);
        return API.get("contacts",`/todos/${this.props.match.params.id}`,options)
    }

    saveContact(contact) {
      return API.put("contacts", `/todos/${this.props.match.params.id}`, {
        body: contact
      });
    }
  
  handleSubmit = async event =>{
    event.preventDefault();
    
    this.setState({isLoading: true});
    try {
        
      await this.saveContact(
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
  
  // render   componentClass="textarea"  onChange={this.handleChange}
  render() {
    return(
      <div className="Contact">
        {this.state.cName &&
          <form onSubmit = {this.handleSubmit}>
            <FormGroup controlId="cName">
              <FormControl
                
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
        }
     

      </div>
      
    )
    
  }
      
}
