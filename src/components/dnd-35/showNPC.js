import { SquareFillIcon } from '@primer/octicons-react'
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
export default class ShowNPC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habilidadesTable: null,
            ataqueBase: null,
            conjuros: <td colSpan="10" className="text-center">No tiene</td>
        }
    }
    componentDidMount() {
        let habilidades = [];
        let ataqueBase = [];
        let conjuros = [];
        for (let i = 0; i < this.props.data.habilidades.length; i++) {
            habilidades[i] =
                <tr key={i} className={this.props.data.habilidades[i][6] ? 'table-primary' : null}>
                    <th scope="row">{this.props.data.habilidades[i][0]} {this.props.data.habilidades[i][7] ? <SquareFillIcon size={16} /> : null}</th>
                    <td>{parseInt(this.props.data.habilidades[i][3]) + parseInt(this.props.data.habilidades[i][4]) + parseInt(this.props.data.habilidades[i][5])}</td>
                    <td>{this.props.data.habilidades[i][3]}</td>
                    <td>{this.props.data.habilidades[i][4]}</td>
                    <td>{this.props.data.habilidades[i][5]}</td>
                </tr>
        }
        for (let i = 0; i < this.props.data.ataqueBase.length; i++) {
            ataqueBase[i] =
                <td key={i} className="text-center">{this.props.data.ataqueBase[i]}</td>
        }
        if (this.props.data.conjuros !== null) {
            for (let i = 0; i < this.props.data.conjuros.length; i++) {
                conjuros[i] = <td key={i} className="text-center">{this.props.data.conjuros[i]}</td>
            }
        }
        this.setState({
            habilidadesTable: habilidades,
            ataqueBase: ataqueBase,
            conjuros: conjuros,
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.componentDidMount();
        }
    }
    render() {
        return (
            <>
                <div id="pnjPage" className="container">
                    <div className="row mb-2">
                        <div className="col-md">
                            <h5 className="text-center">Raza: {this.props.data.raza}</h5>
                        </div>
                        <div className="col-md">
                            <h5 className="text-center">Clase: {this.props.data.clase}</h5>
                        </div>
                        <div className="col-md">
                            <h5 className="text-center">PG: {this.props.data.pg}</h5>
                        </div>
                        <div className="col-md">
                            <h5 className="text-center">Nivel: {this.props.data.nivel}</h5>
                        </div>
                        <div className="col-md">
                            <h5 className="text-center">Alin.: {this.props.data.alineamiento}</h5>
                        </div>
                        <div className="col-md">
                            <h5 className="text-center">Velocidad: {this.props.data.velocidad}</h5>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row">
                        <div className="col-md">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="text-center">Características</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Caract.</th>
                                            <th scope="col">Punt.</th>
                                            <th scope="col">Mod.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Fue</th>
                                            <td>{this.props.data.caracteristicas.Fue[0]}</td>
                                            <td>{this.props.data.caracteristicas.Fue[1]}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Des</th>
                                            <td>{this.props.data.caracteristicas.Des[0]}</td>
                                            <td>{this.props.data.caracteristicas.Des[1]}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Con</th>
                                            <td>{this.props.data.caracteristicas.Con[0]}</td>
                                            <td>{this.props.data.caracteristicas.Con[1]}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Int</th>
                                            <td>{this.props.data.caracteristicas.Int[0]}</td>
                                            <td>{this.props.data.caracteristicas.Int[1]}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sab</th>
                                            <td>{this.props.data.caracteristicas.Sab[0]}</td>
                                            <td>{this.props.data.caracteristicas.Sab[1]}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Car</th>
                                            <td>{this.props.data.caracteristicas.Car[0]}</td>
                                            <td>{this.props.data.caracteristicas.Car[1]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th colSpan="6" className="text-center">Salvaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Fortaleza</th>
                                            <td>{parseInt(this.props.data.salvaciones.fortaleza) + parseInt(this.props.data.caracteristicas.Con[1])}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Reflejos</th>
                                            <td>{parseInt(this.props.data.salvaciones.reflejos) + parseInt(this.props.data.caracteristicas.Des[1])}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Voluntad</th>
                                            <td>{parseInt(this.props.data.salvaciones.voluntad) + parseInt(this.props.data.caracteristicas.Sab[1])}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th colSpan="6" className="text-center">CA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">CA</th>
                                            <td>{this.props.data.ca[0]}</td>
                                            <th scope="row">Toque</th>
                                            <td>{this.props.data.ca[1]}</td>
                                            <th scope="row">Desprevenido</th>
                                            <td>{this.props.data.ca[2]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th colSpan="6" className="text-center">Ataque base</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.state.ataqueBase}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th colSpan="5" className="text-center">Ataques</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>{this.props.data.ataques[0][0]}</th>
                                            <td>{this.props.data.ataques[0][1]}</td>
                                            <td>{this.props.data.ataques[0][2]}</td>
                                        </tr>
                                        <tr>
                                            <th>{this.props.data.ataques[1][0]}</th>
                                            <td>{this.props.data.ataques[1][1]}</td>
                                            <td>{this.props.data.ataques[1][2]}</td>
                                        </tr>
                                        <tr>
                                            <th>{this.props.data.ataques[2][0]}</th>
                                            <td>{this.props.data.ataques[2][1]}</td>
                                            <td>{this.props.data.ataques[2][2]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan="6" className="text-center">Equipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" rowSpan="3" className="text-center">Armas</th>
                                            <td>{this.props.data.equipo.armas[0][0]}</td>
                                            <td>{this.props.data.tam === 'med' ? this.props.data.equipo.armas[0][3] : this.props.data.equipo.armas[0][2]}</td>
                                            <td>{this.props.data.equipo.armas[0][4]}</td>
                                            <td>{this.props.data.equipo.armas[0][5] + "'"}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.data.equipo.armas[1][0]}</td>
                                            <td>{this.props.data.tam === 'med' ? this.props.data.equipo.armas[1][3] : this.props.data.equipo.armas[1][2]}</td>
                                            <td>{this.props.data.equipo.armas[1][4]}</td>
                                            <td>{this.props.data.equipo.armas[1][5] + "'"}</td>
                                        </tr>
                                        <tr>
                                            <td>{this.props.data.equipo.armas[2][0]}</td>
                                            <td>{this.props.data.tam === 'med' ? this.props.data.equipo.armas[2][3] : this.props.data.equipo.armas[2][2]}</td>
                                            <td>{this.props.data.equipo.armas[2][4]}</td>
                                            <td>{this.props.data.equipo.armas[2][5] + "'"}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Armadura</th>
                                            <td colSpan="4">{this.props.data.equipo.armadura === null ? 'Sin armadura' : this.props.data.equipo.armadura[0] + ' + ' + this.props.data.equipo.armadura[2] + ' CA'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Escudo</th>
                                            <td colSpan="4">{this.props.data.equipo.escudo === null ? 'Sin escudo' : this.props.data.equipo.escudo[0] + ' + ' + this.props.data.equipo.escudo[2] + ' CA'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan="10" className="text-center">Conjuros</th>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-center">0</th>
                                            <th scope="row" className="text-center">1</th>
                                            <th scope="row" className="text-center">2</th>
                                            <th scope="row" className="text-center">3</th>
                                            <th scope="row" className="text-center">4</th>
                                            <th scope="row" className="text-center">5</th>
                                            <th scope="row" className="text-center">6</th>
                                            <th scope="row" className="text-center">7</th>
                                            <th scope="row" className="text-center">8</th>
                                            <th scope="row" className="text-center">9</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.state.conjuros}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Mod. Hab.</th>
                                            <th scope="col">Caract.</th>
                                            <th scope="col">Rangos.</th>
                                            <th scope="col">Varios.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.habilidadesTable}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row mb-2">
                        {this.props.bottom}
                    </div>
                    {this.props.bottomFoot}
                </div>
            </>
        )
    }
}