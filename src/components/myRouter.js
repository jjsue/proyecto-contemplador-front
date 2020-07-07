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
            cookieHandler: new Cookies(true),
            showingNow:
                <NavDropdown title="Usuario" id="basic-nav-dropdown">
                    <Link to="/login" className="animate slideIn dropdown-item">Iniciar sesión</Link>
                    <Link to="/register" className="animate slideIn dropdown-item">Registrarse</Link>
                </NavDropdown>,
        }
    }
    componentDidMount() {
        if (this.state.cookieHandler.get('userName') !== undefined) {
            this.setState({ username: this.state.cookieHandler.get('userName') });
            this.setState({
                showingNow:
                    <NavDropdown title={this.state.cookieHandler.get('userName')} id="basic-nav-dropdown">
                        <Link to="/profile" className="animate slideIn dropdown-item">Perfil</Link>
                        <Link to="/exit" className="animate slideIn dropdown-item">Cerrar sesión</Link>
                    </NavDropdown>
            });
        }
    }
    handleLogin = (event) => {
        this.setState({ username: this.state.cookieHandler.get('userName') });
        this.setState({
            showingNow:
                <NavDropdown title={this.state.cookieHandler.get('userName')} id="basic-nav-dropdown">
                    <Link to="/profile" className="animate slideIn dropdown-item">Perfil</Link>
                    <Link to="/exit" className="animate slideIn dropdown-item">Cerrar sesión</Link>
                </NavDropdown>
        });
    }
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
                        <Route path='/login' //De esta forma puedo pasar las props que quiera al componente login
                            render={(props) => (
                                <Login {...props} parentLogin={this.handleLogin} />
                            )} />
                    </Switch>
                </Router>
            </>
        )
    }
}