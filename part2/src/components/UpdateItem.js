import React from 'react';

import '../assets/css/Admin.css';

/*
* Update Item component
* Takes the session name from the Update components and created a text area for the session name to be updated
*
* @author Roxana Pop
*/
class UpdateItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: this.props.details.name,
          item: this.props.details,
          newTitle: ''
        };
    }


handleNameChange = (e) => {
    this.setState({name:e.target.value})
}

handleNameUpdate = () => {
    this.props.update(this.props.details.sessionId, this.state.name)
  }

render() {
  return (
    <div className='update-container'>
      <br/>
      <h3>{this.props.details.name}</h3>
      <textarea
         rows="4" cols="50"
         value={this.state.name}
         onChange={this.handleNameChange}
      />
      <br/>
      <button className='update_btn' onClick={this.handleNameUpdate}>Update</button>
      <br/>
    </div>
  );
}
}

export default UpdateItem;