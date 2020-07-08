import './style/npcGenerator.css'
import React, { Component } from "react";
export default class ShowNPC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habilidadesTable: null
        }
    }
    componentDidMount() {
        let habilidades = []
        for (let i = 0; i < this.props.data.habilidades.length; i++) {
            habilidades[i] =
                <tr key = {i}>
                    <th scope="row">{this.props.data.habilidades[i][0]}</th>
                    <td>{parseInt(this.props.data.habilidades[i][3]) + parseInt(this.props.data.habilidades[i][4]) + parseInt(this.props.data.habilidades[i][5])}</td>
                    <td>{this.props.data.habilidades[i][3]}</td>
                    <td>{this.props.data.habilidades[i][4]}</td>
                    <td>{this.props.data.habilidades[i][5]}</td>
                </tr>
        }
        this.setState({ habilidadesTable: habilidades });
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-md">
                            <h5>Raza: {this.props.data.raza}</h5>
                        </div>
                        <div className="col-md">
                            <h5>Clase: {this.props.data.clase}</h5>
                        </div>
                        <div className="col-md">
                            <h5>Nivel: {this.props.data.nivel}</h5>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row">
                        <div className="col-md">
                            <table className="table table-bordered table-hover">
                                <thead>
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
                        <div className="col-md">
                            <table className="table table-bordered table-hover">
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
            </>
        )
    }
}