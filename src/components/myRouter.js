import './style/myRouter.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//Components
import Home from './home';
import dnd35Generator from './dnd-35/npcGenerator';
export default class MyRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <Router>
                    <Navbar variant="dark" bg="dark" expand="lg">
                        <Navbar.Brand href="/">Proyecto Contemplador</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link to="/" className="nav-link">Inicio</Link>
                                <NavDropdown title="Dragones y Mazmorras 3.5" id="basic-nav-dropdown">
                                    <Link to="/npc35" className="animate slideIn dropdown-item">PNJ</Link>
                                </NavDropdown>
                                <NavDropdown title="Aquelarre" id="basic-nav-dropdown">
                                    <Link to="/npc35" className="animate slideIn dropdown-item">PNJ</Link>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route exact path="/npc35" component={dnd35Generator} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Router>
            </>
        )
    }
}