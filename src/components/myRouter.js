import './style/myRouter.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Home from './home';
import Register from './register';
import Login from './login';
export default class MyRouter extends Component {
    render() {
        return (
            <>
                <Router>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Proyecto Contemplador</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link href="#home">Home</Nav.Link> */}
                                <Link to="/" className="animate slideIn nav-link">Home</Link>
                                <NavDropdown title="Generador" id="basic-nav-dropdown">
                                    <Link to="/npcgenerator" className="animate slideIn dropdown-item">NPC</Link>
                                    {/* <NavDropdown.Divider /> */}
                                </NavDropdown>
                                <NavDropdown title="Usuario" id="basic-nav-dropdown">
                                    <Link to="/login" className="animate slideIn dropdown-item">Iniciar sesión</Link>
                                    <Link to="/register" className="animate slideIn dropdown-item">Registrarse</Link>
                                    <Link to="/exit" className="animate slideIn dropdown-item">Cerrar sesión</Link>
                                    {/* <NavDropdown.Divider /> */}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route path="/ads/:adId" component={DetailComponent} /> */}
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </Router>
            </>
        )
    }
}