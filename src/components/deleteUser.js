import React, { Component } from "react";
import { delUserCall } from './calls/api-calls';
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import { Button, Form, Alert } from 'react-bootstrap'
export default class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formMail: '',
            formName: '',
            formPassword: '',
            responseState: null,
            toShow: null,
            render1: null,
            ImportantInfo: null,
            disabled: false,
        }
    }
    mailChanger = (event) => {
        this.setState({ formMail: event.target.value });
    }
    userChanger = (event) => {
        this.setState({ formName: event.target.value });
    }
    passChanger = (event) => {
        this.setState({ formPassword: event.target.value });
    }
    submitHandler = async (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        this.setState({ responseState: await delUserCall(this.state.formName, this.state.formMail, this.state.formPassword) });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.responseState !== this.state.responseState) {
            if (this.state.responseState.status === 401) {
                this.setState({
                    render1:
                        <Alert variant="danger">
                            {this.state.responseState.data.result}
                        </Alert>,
                        disabled: false,
                });
            }
            else if (this.state.responseState.status === 204) {
                this.setState({
                    render1:
                        <Alert variant="success">
                            Ya estás en el vacío, pulsa en cerrar sesión para borrar las cookies.
                        </Alert>,
                        disabled: false,
                })
            } else {
                this.setState({
                    render1:
                        <Alert variant="danger">
                            Ha ocurrido un error inesperado
                        </Alert>,
                        disabled: false,
                })
            }
        }
    }
    render() {
        const { formMail, formName, formPassword } = this.state;
        return (
            <>
                <div className="container h-100 mt-2">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 text-center bg-dark p-5 rounded">
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group controlId="formMailId">
                                    <Form.Control size="lg" type="email" placeholder="Correo electronico" onChange={this.mailChanger} value={formMail} />
                                </Form.Group>
                                <Form.Group controlId="formUserId">
                                    <Form.Control size="lg" placeholder="Nombre de usuario" onChange={this.userChanger} value={formName} />
                                </Form.Group>
                                <Form.Group controlId="formPasswordId">
                                    <Form.Control size="lg" type="password" placeholder="Contraseña" onChange={this.passChanger} value={formPassword} />
                                </Form.Group>
                                <Button variant="danger" size="lg" type="submit" block disabled={this.state.disabled}>Si haces esto no podremos resucitarte</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="row mb-2 mt-2">
                        <div className="col align-self-center">
                            {this.state.render1}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}