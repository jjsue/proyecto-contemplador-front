import './style/recover.css'
import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import { changePasswordCall } from './calls/api-calls';
export default class Recover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formMail: '',
            formPassword0: '',
            formPassword1: '',
            formCode: '',
            info: <div className="mb-5"><h1>Formulario de recuperación</h1></div>
        }
    }
    submitHandler = async (event) => {
        event.preventDefault();
        if (this.state.formMail !== '' && this.state.formPassword0 !== '' && this.state.formPassword1 !== '' && this.state.formCode !== '') {
            if (this.state.formPassword0 === this.state.formPassword1) {
                const resetResponse = await changePasswordCall(this.state.formMail, this.state.formPassword0, this.state.formCode);
                if (resetResponse.status === 200) {
                    this.setState({ info: <div className="alert alert-primary mb-5"><h1>{resetResponse.data.result}</h1></div> })
                }
                else {
                    this.setState({ info: <div className="alert alert-danger mb-5"><h1>{resetResponse.data.result}</h1></div> })
                }
            } else {
                this.setState({ info: <div className="alert alert-danger mb-5"><h1>Contraseñas diferentes</h1></div> })
            }
        } else {
            this.setState({ info: <div className="alert alert-danger mb-5"><h1>Rellena todos los campos</h1></div> })
        }
    }
    nameHandler = (event) => {
        this.setState({ formMail: event.target.value });
    }
    pass0Handler = (event) => {
        this.setState({ formPassword0: event.target.value });
    }
    pass1Handler = (event) => {
        this.setState({ formPassword1: event.target.value });
    }
    codeHandler = (event) => {
        this.setState({ formCode: event.target.value });
    }
    render() {
        const { formMail, formPassword0, formPassword1, formCode } = this.state;
        return (
            <header className="masthead-recover">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 text-center recover-background p-5 rounded">
                            {this.state.info}
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group controlId="formMail">
                                    <Form.Control size="lg" type="email" placeholder="Correo" value={formMail} onChange={this.nameHandler} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="FormPassword">
                                    <Form.Control size="lg" type="password" placeholder="Contraseña" value={formPassword0} onChange={this.pass0Handler} />
                                </Form.Group>
                                <Form.Group controlId="FormPassword2">
                                    <Form.Control size="lg" type="password" placeholder="Repetir contraseña" value={formPassword1} onChange={this.pass1Handler} />
                                </Form.Group>
                                <Form.Group controlId="formCode">
                                    <Form.Control size="lg" type="password" placeholder="Codigo recibido por email" value={formCode} onChange={this.codeHandler} />
                                </Form.Group>
                                <Button size="lg" variant="primary" type="submit" block>
                                    Cambiar contraseña
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}