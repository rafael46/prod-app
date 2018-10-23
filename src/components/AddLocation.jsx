import React, { Component } from 'react'

export default class AddLocation extends Component {
  
  state = {
    address1: "",
    address2:"",
    "city": "Los Angeles",
    "state": "",
    "zipcode": "",
    "isDefault": false,
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = () => {
  }


  render() {
    return (
      <div>
        <Form onSubnmit= {this.props.handleAddLocationForm}>

        </Form>
      </div>
    )
  }
}
