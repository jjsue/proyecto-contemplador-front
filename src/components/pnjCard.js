import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
export default class PnjCard extends Component {
    render() {
        const enlace = `/npclist/${this.props.data._id}`
        return (
            <>
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4 animate slideIn">
                    <div className="card h-100">
                        <div className="card-body">
                                <h4 className="card-title">
                                    <Link to={enlace} className="card-title">{this.props.data.name}</Link>
                                </h4>
                            <p className="card-text">Clase: {this.props.data.clase}</p>
                            <p className="card-text">Nivel: {this.props.data.nivel}</p>
                            <p className="card-text">Raza: {this.props.data.raza}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}