import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function LandingPage() {
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <Container fluid="true" id="maxme">
      <Jumbotron className="jumbo" fluid="true">
        <Container>
          <Row>
            <Col>
              <div className="intro">
                <h1 className="jumbo_h1">Welcome to Habitat!</h1>
                <p className="jumbo_p">If you've got things you want to get done every single day, this is the place to be to
                keep track of all your tasks and mark the days where you completed them all.
              </p>
                <p className="jumbo_p">Studies repeatedly show that writing down your goals, and having a system in place to hold
                yourself accountable to those goals is the best way to fulfill them long term.
              </p>
                <p className="jumbo_p">We provide that system. The rest is up to you!</p>
              </div>
            </Col>
            <Col>
              <LoginForm />
              <center>
                <h4 id="member">Not a Member?</h4>
                <button className="butn butn_sizeSm butn_register" onClick={onRegister}>
                  Register
            </button>
              </center>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </Container>
  );
}

export default LandingPage;
