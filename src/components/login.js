import './style/login.css';
import React, { Component } from "react";
import {loginCall} from './calls/api-calls';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailValue: 'user@example.es',
            passwordValue: '1234',
            responseState: null,
            responseMessage: ''
        }
    }
    changeHandlerMail = (event) => {
        this.setState({ mailValue: event.target.value });
    }
    changeHandlerPass = (event) => {
        this.setState({ passwordValue: event.target.value });
    }
    submitHandler = async (event) => {
        event.preventDefault();
        this.setState({responseState: await loginCall(this.state.mailValue, this.state.passwordValue)});
        console.log(document.cookie);

    }
    render() {
        const { mailValue, passwordValue } = this.state;
        return (
            <>
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <h3 className="login-heading mb-4">Te enfrentas a poderes que desconoces, inicia sesión bajo tu responsabilidad</h3>
                                            <form onSubmit={this.submitHandler}>
                                                <div className="form-label-group">
                                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={mailValue} required autoFocus onChange={this.changeHandlerMail} />
                                                    <label htmlFor="inputEmail">Dirección de correo extraplanario</label>
                                                </div>

                                                <div className="form-label-group">
                                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={passwordValue} required onChange={this.changeHandlerPass} />
                                                    <label htmlFor="inputPassword">Palabra secreta</label>
                                                </div>

                                                {/* <div className="custom-control custom-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                    <label className="custom-control-label" htmlFor="customCheck1">Recordar</label>
                                                </div> */}
                                                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Lanzar conjuro</button>
                                                <div className="text-center">
                                                    <a className="small" href="/">¿Contraseña olvidada? Pide ayuda a un clérigo</a></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}