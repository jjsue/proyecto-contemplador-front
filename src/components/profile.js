import React, { Component } from "react";
import { retrieveOwn } from "./calls/api-calls";
import PnjCard from './pnjCard';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseState: null,
            responseStateIsPublic: null,
            arrayToShow: null,
            username: null,
        }
    }
    async componentDidMount() {
        const response = await retrieveOwn();
        this.setState({
            responseState: response,
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.responseState !== this.state.responseState) {
            if (this.state.responseState.status === 200) {
                let arrayOfNpc = [];
                for (let i=0; i<this.state.responseState.data.characterArray.length; i++){
                    arrayOfNpc.push(<PnjCard key={i} data={this.state.responseState.data.characterArray[i]}/>)
                }
                this.setState({
                    username:  `Personajes de ${this.state.responseState.data.user}`,
                    arrayToShow: arrayOfNpc,
                });
            } else if (this.state.responseState.status === 401) {
                this.setState({
                    username: this.state.responseState.data.result,
                });
            } else {
                this.setState({
                    username: "Ha ocurrido un error, prueba de nuevo mas tarde",
                });
            }
        }
    }
    render() {
        return (
            <div className="container">
                <h1 className="my-4">{this.state.username}</h1>
                <div className="row">
                    {this.state.arrayToShow}
                </div>
                <hr />
            </div>
        )
    }
}