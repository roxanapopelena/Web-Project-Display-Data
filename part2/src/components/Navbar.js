import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

/*
* Navbar component to display a responsive navbar
* Uses Links from react-router-dom
* It is responsive and changes approapiately if the screen size is resized to a smaller value
* A hamburger button is displayed instead
*
* @author Roxana Pop
*/
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            CHI2020
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/schedule'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Schedule
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/authors'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Authors
              </Link>
            </li>

            <li>
              <Link
                to='/admin'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>ADMIN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
