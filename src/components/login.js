import './style/login.css';
import React, { Component } from "react";
import { loginCall, recoverPasswordCall } from './calls/api-calls';
import { BrowserRouter as Route, Redirect } from "react-router-dom";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailValue: '',
            passwordValue: '',
            responseState: null,
            responseMessage: '',
            redirect: null,
            innerButton: "Lanzar conjuro",
            recoverMessage: null,
        }
    }
    changeHandlerMail = (event) => {
        this.setState({ mailValue: event.target.value });
    }
    changeHandlerPass = (event) => {
        this.setState({ passwordValue: event.target.value });
    }
    recoverPass = async (event) => {
        event.preventDefault();
        this.setState({ innerButton: <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> });
        const response = await recoverPasswordCall(this.state.mailValue);
        if (response.status === 200) {
            this.setState({
                recoverMessage:
                    <div className="alert alert-primary" role="alert">
                        Correo enviado, en unos segundos te redirijo a la página de recuperación de contraseña.
                    </div>,
                innerButton: "Lanzar conjuro"
            });
            setTimeout(() => {
                this.setState({
                    redirect:
                        <Redirect to="/recover" />
                })
            }, 5000);
        } else {
            this.setState({
                recoverMessage:
                    <div className="alert alert-danger" role="alert">
                        {response.data.result}
                    </div>,
                innerButton: "Lanzar conjuro"
            });
        }
    }
    submitHandler = async (event) => {
        event.preventDefault();
        this.setState({ innerButton: <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> });
        this.setState({ responseState: await loginCall(this.state.mailValue, this.state.passwordValue) });
        if ('authToken' in this.state.responseState && 'userName' in this.state.responseState) {
            this.props.parentLogin();
            this.setState({
                redirect:
                    <Redirect to="/profile" />
            })
        } else {
            this.setState({
                redirect:
                    <div className="alert alert-warning" role="alert">
                        Ha ocurrido un error
                    </div>,
                innerButton: "Lanzar conjuro",
            });
        }
    }
    render() {
        const { mailValue, passwordValue } = this.state;
        return (
            <>
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6 backgroundLogin">
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
                                                {this.state.redirect}
                                                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">{this.state.innerButton}</button>
                                                <div className="text-center">
                                                    <a className="small" href="/" onClick={this.recoverPass}>¿Contraseña olvidada? Pon tu correo y haz clic aquí</a></div>
                                                    {this.state.recoverMessage}
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