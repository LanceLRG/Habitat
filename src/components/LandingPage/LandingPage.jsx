import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

function LandingPage() {
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <Jumbotron fluid>
            <Container>
              <h1>Welcome to Habitat!</h1>
            </Container>
          </Jumbotron>
        </div>
        <div className="grid-col grid-col_4">
          <LoginForm />

          <center>
            <h4>Not a Member?</h4>
            <button className="butn butn_sizeSm butn_register" onClick={onRegister}>
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
