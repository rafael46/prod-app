import React, { Component } from 'react'
import { Form, Col} from "react-bootstrap";
// , FormGroup, FormControl, ControlLabel, Col, Button
import LoaderButton from "../components/LoaderButton"
export default class AddLocation extends Component {
  
  state = {
    address1: " ",
    address2:" ",
    "city": "Los Angeles",
    "state": " ",
    "zipcode": " ",
    "isDefault": false,
    isLoading: null,
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({})
    this.props.handleAddLocationForm(this.state)
  }


  render() {
    return (
      <div>
        <Form onSubnmit= {this.handleSubmit}>
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
           

          </Form.Row>
          <button type="submit">save loc1.</button>
          {/* <LoaderButton
              block
              type="submit"
              isLoading={" "}
              text="Save loc"
              loadingText="Saving…"
            /> */}
{/* // this.state.isLoading */}
        </Form>
      </div>
    )
  }
}
