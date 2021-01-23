import React from 'react'

/*
* Session component to display the name of the session
* Used in the HomeSearch component
*
* @author Roxana Pop
*/
class Session extends React.Component {

    state = {
    }
    render() {
    
    return (
      <div>
        <h3>{this.props.details.name}</h3>
      </div>
    );
}
}

export default Session;