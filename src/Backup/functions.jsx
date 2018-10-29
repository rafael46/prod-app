



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


function createContact(contact) {
  console.log(contact)
  return API.post("contacts", "/todos", {
    body: contact
  });
}



