import './style/myRouter.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Home from './home';
import Register from './register';
import Login from './login';
import Cookies from 'universal-cookie';
export default class MyRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            nameCookie: '',
            showingNow:
                <NavDropdown title="Usuario" id="basic-nav-dropdown">
                    <Link to="/login" className="animate slideIn dropdown-item">Iniciar sesión</Link>
                    <Link to="/register" className="animate slideIn dropdown-item">Registrarse</Link>
                </NavDropdown>,
        }
    }
    componentDidMount() {
        const cookies = new Cookies(true);
        if (cookies.get('userName') !== undefined) {
            console.log("If compdidmount")
            this.setState({username: cookies.get('userName')});
            this.setState({
                showingNow:
                    <NavDropdown title={cookies.get('userName')} id="basic-nav-dropdown">
                        <Link to="/profile" className="animate slideIn dropdown-item">Perfil</Link>
                        <Link to="/exit" className="animate slideIn dropdown-item">Cerrar sesión</Link>
                    </NavDropdown>
            });
        }
    }
    test = (event) => {
        this.setState({showingNow: ''});
    }
    render() {
        console.log("Re-render");
        return (
            <>
                <Router>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Proyecto Contemplador</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link href="#home">Home</Nav.Link> */}
                                <Link to="/" className="nav-link">Home</Link>
                                <NavDropdown title="Generador" id="basic-nav-dropdown">
                                    <Link to="/npcgenerator" className="animate slideIn dropdown-item">NPC</Link>
                                    {/* <NavDropdown.Divider /> */}
                                </NavDropdown>
                                {this.state.showingNow}
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