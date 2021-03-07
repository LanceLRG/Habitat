import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <img src="images/Habitatlogo.png" alt="Habitat Logo" className="nav-title" />
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {(loginLinkData.text === 'Home') && <>
          <FontAwesomeIcon icon={['fas', `list-ul`]} size="2x" />
          <br />
          </>
          }
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}
            <Link className="navLink" to="/calendar">
              <FontAwesomeIcon icon={['fas', `calendar`]} size="2x" />
              <br />
              Calendar
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
