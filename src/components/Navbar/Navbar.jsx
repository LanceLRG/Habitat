import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogOutButton from '../LogOutButton/LogOutButton';
import '../Nav/Nav.css';
import { useSelector } from 'react-redux';

function Navbar() {

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
        <>
            <Nav className="justify-content-right">
                <Nav.Item>
                    <Nav.Link href="/user">Home</Nav.Link>
                </Nav.Item>

                {user.id && (
                    <>
                        <Nav.Item>
                            <Nav.Link className="navLink" to="/info">
                                Info Page
                                </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navLink" to="/calendar">
                                Calendar
                                </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <LogOutButton className="navLink" />
                        </Nav.Item>
                    </>
                )}
            </Nav>
        </>
    )
}

export default Navbar;