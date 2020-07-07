import './style/register.css';
import React, { Component } from "react";
import { registerCall } from './calls/api-calls'
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userValue: 'Hulk',
            mailValue: 'user@example.es',
            passwordValue0: '1234',
            passwordValue1: '12345',
            responseState: null,
            responseMessage: null,
            redirect: null,
        }
    }
    changeHandlerUser = (event) => {
        this.setState({ userValue: event.target.value });
    }
    changeHandlerMail = (event) => {
        this.setState({ mailValue: event.target.value });
    }
    changeHandlerPass0 = (event) => {
        this.setState({ passwordValue0: event.target.value });
    }
    changeHandlerPass1 = (event) => {
        this.setState({ passwordValue1: event.target.value });
    }
    submitHandler = async (event) => {
        event.preventDefault();
        if (this.state.passwordValue0 !== this.state.passwordValue1) {
            this.setState({
                responseMessage:
                    <div className="alert alert-warning mt-2" role="alert">
                        Las contraseñas no coinciden
                    </div>
            });
        } else {
            this.setState({ responseState: await registerCall(this.state.userValue, this.state.passwordValue0, this.state.mailValue) });
            if (this.state.responseState.status === 403) {
                if (this.state.responseState.data.error === "Email already exists") {
                    this.setState({
                        responseMessage:
                            <div className="alert alert-warning mt-2" role="alert">
                                El email ya está en uso
                            </div>
                    });
                }
                if (this.state.responseState.data.error === "Username already exists") {
                    this.setState({
                        responseMessage:
                            <div className="alert alert-warning mt-2" role="alert">
                                El nombre de usuario ya está en uso
                            </div>
                    });
                } else {
                    this.setState({
                        responseMessage:
                            <div className="alert alert-warning mt-2" role="alert">
                                Error desconocido, prueba de nuevo en unos segundos.
                            </div>
                    });
                }
            }
            if (this.state.responseState.result === "user created") {
                this.setState({
                    responseMessage:
                        <div className="alert alert-primary mt-2" role="alert">
                            Usuario creado. Ve al login para iniciar sesión.
                        </div>
                });
            }
        }
    }
    render() {
        const { userValue, mailValue, passwordValue0, passwordValue1 } = this.state;
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card card-signin flex-row my-5">
                                <div className="card-img-left d-none d-md-flex">
                                    {/* <!-- Background image for card set in CSS! --> */}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Pasa, te esperamos</h5>
                                    <form className="form-signin" onSubmit={this.submitHandler}>
                                        <div className="form-label-group">
                                            <input type="text" id="inputUserame" className="form-control" placeholder="Username" value={userValue} required autoFocus onChange={this.changeHandlerUser} />
                                            <label htmlFor="inputUserame">Nombre de usuario</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={mailValue} required onChange={this.changeHandlerMail} />
                                            <label htmlFor="inputEmail">Correo electrónico</label>
                                        </div>

                                        <hr />

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={passwordValue0} required onChange={this.changeHandlerPass0} />
                                            <label htmlFor="inputPassword">Contraseña</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" value={passwordValue1} required onChange={this.changeHandlerPass1} />
                                            <label htmlFor="inputConfirmPassword">Contraseña</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Registrarse</button>
                                    </form>

                                </div>
                            </div>
                            {this.state.responseMessage}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}