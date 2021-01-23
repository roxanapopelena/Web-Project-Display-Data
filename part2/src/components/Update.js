import React from 'react';
import UpdateItem from './UpdateItem.js';
import { API } from '../constants'

/*
* Update component
* Retrieves all sessions from the API
*
* @author Roxana Pop
*/
class Update extends React.Component {

state = {data:[]}

componentDidMount() {
 const url = `${API}sessions`
 fetch(url)
   .then( (response) => response.json() )
   .then( (data) => {
   this.setState({data:data.data});
 })
   .catch ((err) => {
     console.log("something went wrong ", err)
   }
 );
}

render() {
  return (
    <div>
        {this.state.data.map((details,i) => (<UpdateItem key={i} update={this.props.handleUpdateClick} details={details}/>))}
    </div>
  );
}
}

export default Update;