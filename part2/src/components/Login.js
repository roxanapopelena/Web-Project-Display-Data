import React from 'react';

import '../assets/css/Buttons.css';
import '../assets/css/Login.css';

/*
* Basic login component 
* Displays a login form 
* Used in the Admin page
*
* @author Roxana Pop
*/
class Login extends React.Component {

render() {
  return (
    <div className='form'>
       <input
        className='emailInput'
         type='text' 
         placeholder='Enter email'
         value={this.props.email}
         onChange={this.props.handleEmail}
       />
       <input
       className='passwordInput'
         type='password' 
         placeholder='Enter password'
         value={this.props.password}
         onChange={this.props.handlePassword}
       />
      <button className='button' onClick={this.props.handleLoginClick}>Log in</button>
    </div>
  );
}
}

export default Login;