import './style/npcGenerator.css'
import React, { Component } from "react";
import { uniqueCharacterCall } from './calls/api-calls';
import ShowNPC from './showNPC';
export default class NpcParentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseState: null,
            renderingNow: null,
            title: null,
            id: null,
        }
    }
    async componentDidMount() {
        const characterId = window.location.pathname.slice(9);
        this.setState({ id: characterId });
        const response = await uniqueCharacterCall(characterId);
        this.setState({ responseState: response });
    }
    componentDidUpdate(prevprops, prevState) {
        if (prevState.responseState !== this.state.responseState) {
            if (this.state.responseState.status === 200) {
                this.setState({
                    title: this.state.responseState.data.name,
                    renderingNow: <ShowNPC data={this.state.responseState.data} bottom={null} />,
                });
            }
            else if (this.state.responseState.status === 401) {
                this.setState({
                    title: this.state.responseState.data.result,
                });
            } else {
                console.log("Else");
                this.setState({
                    title: "Ha ocurrido un error, vuelve al listado y prueba de nuevo",
                });
            }
        }
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="card border-0 shadow my-5">
                        <div className="card-body p-5">
                            <h1 className="font-weight-light">{this.state.title}</h1>
                            <hr />
                            {this.state.renderingNow}
                            {/* <div style={{ height: '700px' }}></div> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}