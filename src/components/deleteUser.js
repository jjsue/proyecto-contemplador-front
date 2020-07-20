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
            render2: null,
            ImportantInfo: null,
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
        this.setState({ responseState: await delUserCall(this.state.formName, this.state.formMail, this.state.formPassword) });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.responseState !== this.state.responseState) {
            console.log(this.state.responseState.status);
            console.log(this.state.responseState.data.result);
            if (this.state.responseState.status === 401) {
                this.setState({
                    render2:
                        <Alert variant="danger">
                            {this.state.responseState.data.result}
                        </Alert>
                });
            }
            else if (this.state.responseState.status === 204) {
                this.setState({
                    render2:
                        <Alert variant="success">
                            Ya estás en el vacío, pulsa en cerrar sesión para borrar las cookies.
                        </Alert>
                })
            } else {
                this.setState({
                    render2:
                        <Alert variant="danger">
                            Ha ocurrido un error inesperado
                        </Alert>
                })
            }
        }
    }
    render() {
        const { formMail, formName, formPassword } = this.state;
        return (
            <>
                <div className="container mt-2">
                    <div className="row align-items-center mb-2 mt-2">
                        <div className="col align-self-center">
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
                                <Button variant="danger" size="lg" type="submit" block>Si haces esto no podremos resucitarte</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="row mb-2 mt-2">
                        <div className="col align-self-center">
                            {this.state.render2}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}