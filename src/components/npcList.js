import './style/loading.css';
import './style/npcList.css';
import React, { Component } from "react";
import PnjCard from './pnjCard'
import { publicCharacterCall } from './calls/api-calls';
import { Switch } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
const queryString = require('query-string');
export default class NpcList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottomPage: null,
            renderForm:
                <Form onSubmit={this.submitController}>
                    <div className="container">
                        <div className="row">
                            <Form.Group controlId="formBasicEmail" className="col-sm">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" onChange={this.nameController} />
                            </Form.Group>
                            <div className="col-sm">
                                <div className="row">
                                    <Form.Group controlId="nivelMin" className="col-sm">
                                        <Form.Label>Nivel-Min:</Form.Label>
                                        <Form.Control as="select" onChange={this.levelMinController}>
                                            <option value=''>-</option>
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
                                    <Form.Group controlId="nivelMax" className="col-sm">
                                        <Form.Label>Nivel-Max</Form.Label>
                                        <Form.Control as="select" onChange={this.levelMaxController}>
                                            <option value=''>-</option>
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
                                </div>
                            </div>
                            <Form.Group controlId="raza" className="col-sm">
                                <Form.Label>Raza:</Form.Label>
                                <Form.Control as="select" onChange={this.raceController}>
                                    <option value=''>-</option>
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
                                    <option value=''>-</option>
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
                            <Form.Group controlId="clase" className="col-sm">
                                <Form.Label>Clase</Form.Label>
                                <Form.Control as="select" onChange={this.sortController}>
                                    <option value='recent'>Nuevos</option>
                                    <option value='old'>Antiguos</option>

                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Button onClick={this.clickController} value="filter" type="submit" className="col-sm mr-2" size="lg">Filtrar</Button>
                            <Button onClick={this.clickController} value="erase" variant="secondary" type="submit" className="col-sm ml-2" size="lg">Borrar filtros</Button>
                        </div>
                    </div>
                </Form>,
            renderButton:
                <>
                    <Button onClick={this.clickController} value="openFilters" type="submit" className="col-sm mr-2" size="lg">Filtrar</Button>
                </>,
            arrayToShow:
                <>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                    <div className="lds-circle col-lg-3 col-md-4 col-sm-6 mb-4"><div></div></div>
                </>,
            responseState: null,
            paginationFirstArrow: "page-item disabled",
            paginationSecondArrow: "page-item",
            paginationFirstNumber: 1,
            paginationFirstNumberClass: 'page-item active',
            paginationSecondNumber: 2,
            paginationSecondNumberClass: 'page-item',
            paginationThirdNumber: 3,
            paginationThirdNumberClass: 'page-item',
            paginationPage: 1,
            formName: undefined,
            formRace: undefined,
            formClass: undefined,
            formLevelMax: undefined,
            formLevelMin: undefined,
            formSort: undefined,
        }
    }
    componentDidMount() {
        this.pnjCall(this.queryBuilder(this.state.paginationPage));
        this.setState({ bottomPage: this.state.renderButton });
    }
    nameController = (event) => {
        this.setState({ formName: event.target.value });
    }
    levelMinController = (event) => {
        this.setState({ formLevelMin: event.target.value });
    }
    levelMaxController = (event) => {
        this.setState({ formLevelMax: event.target.value });
    }
    raceController = (event) => {
        this.setState({ formRace: event.target.value });
    }
    classController = (event) => {
        this.setState({ formClass: event.target.value });
    }
    sortController = (event) => {
        this.setState({ formRace: event.target.value });
    }
    clickController = (event) => {
        if (event.target.value === 'filter') {
            this.pnjCall(this.queryBuilder(this.state.paginationPage));
        } else if (event.target.value === 'openFilters') {
            this.setState({
                bottomPage: this.state.renderForm,
                formName: '',
                formRace: '',
                formClass: '',
                formLevelMax: '',
                formLevelMin: '',
                formSort: 'recent',
            });
        } else {
            this.setState({
                bottomPage: this.state.renderButton,
                formName: undefined,
                formRace: undefined,
                formClass: undefined,
                formLevelMax: undefined,
                formLevelMin: undefined,
                formSort: undefined,
            });
        }
    }
    submitController = (event) => {
        event.preventDefault();
    }
    pnjCall = async (qstring) => {
        try {
            this.setState({ responseState: await publicCharacterCall(qstring) });
            if (this.state.responseState.data.length > 0 && this.state.responseState.status === 200) {
                this.setState({ arrayToShow: null });
                let arrayVariable = []
                for (let i = 0; i < this.state.responseState.data.length; i++) {
                    arrayVariable[i] = <PnjCard key={i} data={this.state.responseState.data[i]} />
                }
                this.setState({ arrayToShow: arrayVariable });
            }
            else if (this.state.responseState.data.length === 0) {
                this.setState({ arrayToShow: "No resultados" });
            } else {
                this.setState({ arrayToShow: "Ha ocurrido algún tipo de error, vuelve a intentarlo en unos segundos." });
            }
        } catch (err) {
            console.log(err);
        }
    }
    queryBuilder = (skip) => {
        const myQuery = {}
        myQuery.skip = (parseInt(skip) - 1) * 8;
        myQuery.sort = this.state.formSort;
        myQuery.name = this.state.formName !== '' ? this.state.formName : undefined;
        myQuery.race = this.state.formRace !== '' ? this.state.formRace : undefined;
        myQuery.class = this.state.formClass !== '' ? this.state.formClass : undefined;
        myQuery.levelMax = this.state.formLevelMax !== '' ? this.state.formLevelMax : 20;
        myQuery.levelMin = this.state.formLevelMin !== '' ? this.state.formLevelMin : 1;
        myQuery.limit = 8;
        return queryString.stringify(myQuery)
    }
    pagination = (event) => {
        event.preventDefault();
        if (event.target.value === 'previous' || event.target.value === 'next') {
            switch (event.target.value) {
                case 'previous':
                    if (this.state.paginationPage - 1 === 1) {
                        this.pnjCall(this.queryBuilder(1));
                        this.setState({ paginationPage: this.state.paginationPage - 1 });
                    }
                    else {
                        this.pnjCall(this.queryBuilder(parseInt(this.state.paginationPage) - 1));
                        this.setState({
                            paginationFirstNumber: this.state.paginationFirstNumber - 1,
                            paginationSecondNumber: this.state.paginationSecondNumber - 1,
                            paginationThirdNumber: this.state.paginationThirdNumber - 1,
                            paginationPage: this.state.paginationPage - 1,
                        });
                    }
                    break;
                case 'next':
                    if (this.state.paginationPage === 1) {
                        this.pnjCall(this.queryBuilder(parseInt(this.state.paginationPage) + 1));
                        this.setState({
                            paginationPage: this.state.paginationPage + 1,
                        });
                    } else {
                        this.pnjCall(this.queryBuilder(parseInt(this.state.paginationPage) + 1));
                        this.setState({
                            paginationFirstNumber: this.state.paginationFirstNumber + 1,
                            paginationSecondNumber: this.state.paginationSecondNumber + 1,
                            paginationThirdNumber: this.state.paginationThirdNumber + 1,
                            paginationPage: this.state.paginationPage + 1,
                        });
                    }
                    break;
                default:
                    break;
            }
        }
        if (!isNaN(event.target.value)) {
            if (parseInt(event.target.value) === 1) {
                this.setState({ paginationPage: this.state.paginationPage - 1 });
            } else {
                this.setState({
                    paginationFirstNumber: parseInt(event.target.value) - 1,
                    paginationSecondNumber: parseInt(event.target.value),
                    paginationThirdNumber: parseInt(event.target.value) + 1,
                    paginationPage: parseInt(event.target.value),
                });
            }
            this.pnjCall(this.queryBuilder(parseInt(event.target.value)));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.paginationPage > 1 && prevState.paginationPage !== this.state.paginationPage) {
            this.setState({
                paginationFirstNumberClass: 'page-item',
                paginationSecondNumberClass: 'page-item active',
                paginationThirdNumberClass: 'page-item',
                paginationFirstArrow: "page-item",
                paginationSecondArrow: "page-item",
            });
        }
        if (this.state.paginationPage === 1 && prevState.paginationPage !== this.state.paginationPage) {
            this.setState({
                paginationFirstNumberClass: 'page-item active',
                paginationSecondNumberClass: 'page-item',
                paginationThirdNumberClass: 'page-item',
                paginationFirstArrow: "page-item disabled",
                paginationSecondArrow: "page-item",
            });
        }
        if (prevState.responseState !== this.state.responseState) {
            if (this.state.responseState.data.length !== 8) {
                this.setState({
                    paginationThirdNumberClass: "page-item disabled",
                    paginationSecondArrow: "page-item disabled",
                });
            }
            else if (this.state.responseState.data.length === 8) {
                this.setState({
                    paginationThirdNumberClass: "page-item",
                    paginationSecondArrow: "page-item",
                });
            }
        }
    }
    render() {
        return (
            <>
                <div className="container containerNPC pr-4 pl-4 p-2 mt-1 border rounded border-secondary">
                    <div className="row">
                        <h1 className="col-12 text-center text-white">Listado de PNJ</h1>
                    </div>
                    <hr/>
                    <div className="row">
                        {this.state.arrayToShow}
                    </div>
                    <ul className="pagination justify-content-center">
                        <li className={this.state.paginationFirstArrow}>
                            <button onClick={this.pagination} className="page-link" aria-label="Previous" value="previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        <li className={this.state.paginationFirstNumberClass}>
                            <button onClick={this.pagination} className="page-link" value={this.state.paginationFirstNumber}>{this.state.paginationFirstNumber}</button>
                        </li>
                        <li className={this.state.paginationSecondNumberClass}>
                            <button onClick={this.pagination} className="page-link" value={this.state.paginationSecondNumber}>{this.state.paginationSecondNumber}</button>
                        </li>
                        <li className={this.state.paginationThirdNumberClass}>
                            <button onClick={this.pagination} className="page-link" value={this.state.paginationThirdNumber}>{this.state.paginationThirdNumber}</button>
                        </li>
                        <li className={this.state.paginationSecondArrow}>
                            <button onClick={this.pagination} className="page-link" aria-label="Next" value="next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                    <hr />
                    {this.state.bottomPage}
                </div>
            </>
        )
    }
}