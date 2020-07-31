import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import { pnjGeneratorCallDnD35 } from './../calls/api-calls';
import ShowNPC from './showNPC';
export default class NpcGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            formNivel: '1',
            formRaza: 'humano',
            formClase: 'barbaro',
            formDados: '2d6',
            renderingNow: '',
            title: 'Generador de PNJ 3.5',
            saveResponse: null,
            characterName: '',
            form:
                <>
                    <Form onSubmit={this.submitController}>
                        <div className="container">
                            <div className="row">
                                <Form.Group controlId="nivel" className="col-sm">
                                    <Form.Label>Nivel:</Form.Label>
                                    <Form.Control as="select" onChange={this.levelController}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                        <option value='12'>12</option>
                                        <option value='13'>13</option>
                                        <option value='14'>14</option>
                                        <option value='15'>15</option>
                                        <option value='16'>16</option>
                                        <option value='17'>17</option>
                                        <option value='18'>18</option>
                                        <option value='19'>19</option>
                                        <option value='20'>20</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="raza" className="col-sm">
                                    <Form.Label>Raza:</Form.Label>
                                    <Form.Control as="select" onChange={this.raceController}>
                                        <option value='humano'>Humano</option>
                                        <option value='elfo'>Elfo</option>
                                        <option value='enano'>Enano</option>
                                        <option value='gnomo'>Gnomo</option>
                                        <option value='mediano'>Mediano</option>
                                        <option value='semielfo'>Semielfo</option>
                                        <option value='semiorco'>Semiorco</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="clase" className="col-sm">
                                    <Form.Label>Clase</Form.Label>
                                    <Form.Control as="select" onChange={this.classController}>
                                        <option value='barbaro'>Bárbaro</option>
                                        <option value='bardo'>Bardo</option>
                                        <option value='clerigo'>Clérigo</option>
                                        <option value='druida'>Druida</option>
                                        <option value='explorador'>Explorador</option>
                                        <option value='guerrero'>Guerrero</option>
                                        <option value='hechicero'>Hechicero</option>
                                        <option value='mago'>Mago</option>
                                        <option value='monje'>Monje</option>
                                        <option value='paladin'>Paladin</option>
                                        <option value='picaro'>Pícaro</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="dados" className="col-sm">
                                    <Form.Label>Dados:</Form.Label>
                                    <Form.Control as="select" onChange={this.diceController}>
                                        <option value='2d6'>2d6</option>
                                        <option value='3d6'>3d6</option>
                                        <option value='4d6'>4d6</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Button type="submit" className="col-sm">Generar</Button>
                            </div>
                        </div>
                    </Form>
                </>,
            responseState: null,
            bottomChildren: <>
                <div className="col-md">
                    <Button type="submit" size="lg" block>Descargar</Button>
                </div>
                <div className="col-md">
                    <Button variant="warning" size="lg" block onClick={this.onClickChildrenReturn}>Crear otro</Button>{' '}
                </div>
                <div className="col-md">
                    <Button variant="warning" size="lg" block onClick={this.onClickGenerateOther}>Generar otro igual</Button>{' '}
                </div>
            </>,
        }
    }
    componentDidMount() {
        this.setState({ renderingNow: this.state.form });
    }
    levelController = (event) => {
        this.setState({ formNivel: event.target.value });
    }
    raceController = (event) => {
        this.setState({ formRaza: event.target.value });
    }
    classController = (event) => {
        this.setState({ formClase: event.target.value });
    }
    diceController = (event) => {
        this.setState({ formDados: event.target.value });
    }
    onClickChildrenReturn = (event) => {
        event.preventDefault();
        this.setState({
            renderingNow: this.state.form,
            title: "Generador de NPC",
        });
    }
    onClickGenerateOther = async (event) => {
        event.preventDefault();
        try {
            let response = await pnjGeneratorCallDnD35(this.state.formNivel, this.state.formClase, this.state.formRaza, this.state.formDados);
            this.setState({ responseState: response });
            this.evaluator(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    submitController = async (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        try {
            let response = await pnjGeneratorCallDnD35(this.state.formNivel, this.state.formClase, this.state.formRaza, this.state.formDados);
            this.setState({ responseState: response });
            this.evaluator(response);
        } catch (err) {
            console.log(err);
        }
    }
    submitSave = async (event) => {
        event.preventDefault();
        try {
            this.setState({ disabled: true });
            const dataToSend = this.state.responseState.data.createdCharacter;
            dataToSend.name = this.state.characterName;
            //this.setState({ saveResponse: await characterSaveCall(dataToSend) });
            if (this.state.saveResponse.status === 201) {
                this.setState({
                    bottomChildren:
                        <>
                            <div className="col-md">
                                <Form onSubmit={this.submitSave}>
                                    <div className="row">
                                        <Form.Group className="col-sm">
                                            <Form.Control size="lg" type="text" placeholder="Nombre del personaje" disabled onChange={this.onChangeSave} />
                                        </Form.Group>
                                    </div>
                                    <div className="row">
                                        <Button type="submit" size="lg" className="col-sm disabled">Guardado</Button>
                                    </div>
                                </Form>
                            </div>
                            <div className="col-md">
                                <Button variant="warning" size="lg" block onClick={this.onClickChildrenReturn}>Crear otro</Button>{' '}
                            </div>
                        </>

                })
            }
            else if (this.state.saveResponse.status === 422) {
                alert('Ya tienes un personaje igual o la request no es válida, intenta de nuevo mas tarde')
            }
            else {
                alert("Ha ocurrido un error, intentelo mas tarde");
            }

        } catch (err) {
            console.log(err);
        }
    }
    onChangeSave = (event) => {
        this.setState({ characterName: event.target.value });
    }
    evaluator = (responseData) => {
        if (responseData.status === 200) {
            this.setState({
                renderingNow: <ShowNPC data={responseData.data.createdCharacter} bottom={this.state.bottomChildren} />,
                title: "Tu personaje",
            });
            if (responseData.status === 422) {
                alert('Ya tienes un personaje igual o la request no es válida, intenta de nuevo mas tarde')
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.bottomChildren !== this.state.bottomChildren) {
            this.setState({
                renderingNow: <ShowNPC data={this.state.responseState.data.createdCharacter} bottom={this.state.bottomChildren} />,
            });
        }
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="card border-0 shadow my-5">
                        <div className="card-body p-5 bodyGen">
                            <h1 className="font-weight-light">{this.state.title}</h1>
                            <hr />
                            {this.state.renderingNow}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}