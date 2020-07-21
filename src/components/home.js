import './style/home.css'
import React, { Component } from "react";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg1: { backgroundImage: "url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')" },
            bg2: { backgroundImage: "url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')" },
            bg3: { backgroundImage: "url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')" },
        }
    }
    render() {
        return (
            <>
                <header className="masthead">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12 text-center">
                                <h1 className="font-weight-light">Proyecto contemplador</h1>
                                {/* <p className="lead">Una aplicación web para los mas roleros</p> */}
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}