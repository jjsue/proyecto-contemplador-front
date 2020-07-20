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
                <header class="masthead">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-12 text-center">
                                <h1 class="font-weight-light">Proyecto contemplador</h1>
                                {/* <p class="lead">Una aplicación web para los mas roleros</p> */}
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}