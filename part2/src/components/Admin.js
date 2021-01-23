import React from 'react';
import Login from './Login';
import Update from './Update.js';

import '../assets/css/Admin.css'
import '../assets/css/Buttons.css'


/*
* Admin class to manage the Admin page
* Checks for an appropriate token with valid details.
* If a token is found, the Update element will be displayed.
* If not, a login form will be used instead from the Login components.
*
* @author Roxana Pop
*/
class Admin extends React.Component {

componentDidMount() {
        if(localStorage.getItem('myToken')) {
          this.setState({"authenticated":true});
        } 
      }
      state = {"authenticated":false, "email":"", "password":""}
      
constructor(props) {
    super(props);
    this.state = {
      "authenticated":false,
      "email":"",
      "password":"",
      data:[]
      }
     
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
}

 postData = (url, myJSON, callback) => {
    fetch(url, {   method: 'POST',
                   headers : new Headers(),
                   body:JSON.stringify(myJSON)})
      .then( (response) => response.json() )
      .then( (data) => {
        callback(data)
      })
      .catch ((err) => {
        console.log("something went wrong ", err)
      }
    );
  }

  loginCallback = (data) => {
    console.log(data)
    if (data.status === 200) {
        this.setState({"authenticated":true})
        localStorage.setItem('myToken', data.token); 
    }
  }
  
  updateCallback = (data) => {
    console.log(data)
    if (data.status !== 200) {
      this.setState({"authenticated":false})
      localStorage.removeItem('myToken');  
    }
  }

 handleLoginClick = () => {
    const url = "http://unn-w18004367.newnumyspace.co.uk/kf6012/part1/a/api/login"
    let myJSON = {"email":this.state.email, "password":this.state.password}
    this.postData(url, myJSON, this.loginCallback)
 }

 handleLogoutClick = () => {
    this.setState({"authenticated":false})
    localStorage.removeItem('myToken'); 
  }

 handleUpdateClick = (sessionId,name) => {
    const url = "http://unn-w18004367.newnumyspace.co.uk/kf6012/part1/a/api/update"

    if (localStorage.getItem('myToken')) {
        let myToken = localStorage.getItem('myToken')
        let myJSON = {
          "token":myToken,
          "sessionId":sessionId, 
          "name":name
         }
         this.postData(url, myJSON, this.updateCallback)
       } else {
         this.setState({"authenticated":false})
       }
     }

handlePassword = (e) => {
        this.setState({password:e.target.value})
      }
handleEmail = (e) => {
        this.setState({email:e.target.value})
      }

 render() {

  let filteredData =  (
    this.state.data
  )

    let page = <Login handleLoginClick={this.handleLoginClick} email={this.state.email} password={this.props.password} handleEmail={this.handleEmail} handlePassword={this.handlePassword}/>
  if (this.state.authenticated) {
    page = <div>
            <h2>Update the details of a session.</h2>
            <br/>
            <button className='button' onClick={this.handleLogoutClick}>Log out</button>
            <Update handleUpdateClick={this.handleUpdateClick} />
           </div>
  }
   return (
    <div className='container'>
    <h1 className='header'>Admin</h1>
    <hr className='hr' />
    <h2 className='header2'>Welcome to the admin page.</h2>
    { 
           filteredData
           .map( (details, i) => (<Update key={i} details={details} />) )
         }
    {page}
  </div>
   );
 }
}

export default Admin;