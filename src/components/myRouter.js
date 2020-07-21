import './style/myRouter.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//Components
import Home from './home';
import Register from './register';
import Login from './login';
import NpcList from './npcList';
import NpcParentList from './npcParentList';
import NpcGenerator from './npcGenerator';
import Profile from './profile';
import Exit from './exit';
import DeleteUser from './deleteUser';
import Recover from './recover';
//Cookies
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
                        <Link to="/deleteuser" className="animate slideIn dropdown-item">Borrar perfil</Link>
                        <Link to="/exit" className="animate slideIn dropdown-item">Cerrar sesión</Link>
                    </NavDropdown>
            });
        }
    }
    handleLogin = (event) => {
        const userNameCookie = this.state.cookieHandler.get('userName');
        if (userNameCookie === undefined) {
            this.setState({
                showingNow:
                    <NavDropdown title="Usuario" id="basic-nav-dropdown">
                        <Link to="/login" className="animate slideIn dropdown-item">Iniciar sesión</Link>
                        <Link to="/register" className="animate slideIn dropdown-item">Registrarse</Link>
                    </NavDropdown>,
            })
        } else {
            this.setState({
                showingNow:
                    <NavDropdown title={userNameCookie} id="basic-nav-dropdown">
                        <Link to="/profile" className="animate slideIn dropdown-item">Perfil</Link>
                        <Link to="/deleteuser" className="animate slideIn dropdown-item">Borrar perfil</Link>
                        <Link to="/exit" className="animate slideIn dropdown-item">Cerrar sesión</Link>
                    </NavDropdown>,
                username: userNameCookie,
            });
        }
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
                                <Link to="/" className="nav-link">Home</Link>
                                <Link to="/npclist" className="nav-link">Listado PNJ</Link>
                                <NavDropdown title="Generador" id="basic-nav-dropdown">
                                    <Link to="/npcgenerator" className="animate slideIn dropdown-item">NPC</Link>
                                </NavDropdown>
                                {this.state.showingNow}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path="/npcgenerator" component={NpcGenerator} />
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path='/login'
                            render={(props) => (
                                <Login {...props} parentLogin={this.handleLogin} />
                            )} />
                        <Route exact path="/npclist" component={NpcList} />
                        <Route path="/npclist/:npcId" component={NpcParentList} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path='/exit'
                            render={(props) => (
                                <Exit {...props} parentLogin={this.handleLogin} />
                            )} />
                        <Route exact path="/deleteuser" component={DeleteUser} />
                        <Route exact path="/recover" component={Recover} />
                    </Switch>
                </Router>
            </>
        )
    }
}