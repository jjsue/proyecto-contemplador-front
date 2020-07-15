import './style/npcGenerator.css'
import React, { Component } from "react";
import { uniqueCharacterCall, obtainCharacterIsPublic, changeCharacterPublic } from './calls/api-calls';
import ShowNPC from './showNPC';
import { Form, Button } from 'react-bootstrap';
export default class NpcParentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseState: null,
            renderingNow: null,
            bottomState: null,
            bottomRender: null,
            title: null,
            id: null,
        }
    }
    async componentDidMount() {
        const characterId = window.location.pathname.slice(9);
        this.setState({ id: characterId });
        const response = await uniqueCharacterCall(characterId);
        const bottomResponse = await obtainCharacterIsPublic(characterId);
        this.setState({
            responseState: response,
            bottomState: bottomResponse,
        });
    }
    componentDidUpdate(prevprops, prevState) {
        if (prevState.bottomState !== this.state.bottomState) { //Controlamos el bottomResponse
            if (this.state.bottomState.status === 200) {
                if (this.state.bottomState.data.result === true) {
                    this.setState({
                        bottomRender:
                            <>
                                <div className="col-md">
                                    <Button value="makePrivate" variant="primary" size="lg" block onClick={this.makePublicOrPrivate}>Hacer privado</Button>{' '}
                                </div>
                                <div className="col-md">
                                    <Button value="makePublic" variant="warning" size="lg" block disabled onClick={this.makePublicOrPrivate}>Hacer público</Button>{' '}
                                </div>
                            </>,
                    });
                } else if (this.state.bottomState.data.result === false) {
                    this.setState({
                        bottomRender:
                            <>
                                <div className="col-md">
                                    <Button value="makePrivate" variant="primary" size="lg" block disabled onClick={this.makePublicOrPrivate}>Hacer privado</Button>{' '}
                                </div>
                                <div className="col-md">
                                    <Button value="makePublic" variant="warning" size="lg" block onClick={this.makePublicOrPrivate}>Hacer público</Button>{' '}
                                </div>
                            </>,
                    });
                } else {
                    this.setState({bottomRender: null});
                }
            }
        }
        if (prevState.responseState !== this.state.responseState || this.state.reRenderChildren) {
            if (this.state.responseState.status === 200) {
                this.setState({
                    title: this.state.responseState.data.name,
                    renderingNow: <ShowNPC data={this.state.responseState.data} bottom={this.state.bottomRender} />,
                });
            }
            else if (this.state.responseState.status === 401) {
                this.setState({
                    title: this.state.responseState.data.result,
                });
            } else {
                this.setState({
                    title: "Ha ocurrido un error, vuelve al listado y prueba de nuevo",
                });
            }
        }
        if (prevState.bottomRender !== this.state.bottomRender) {
            this.setState({
                renderingNow: <ShowNPC data={this.state.responseState.data} bottom={this.state.bottomRender} />,
            });
        }
    }
    makePublicOrPrivate = async (event) => {
        event.preventDefault();
        this.setState({
            bottomRender:
                <>
                    <div className="col-md">
                        <Button variant="primary" size="lg" block disabled onClick={this.makePublicOrPrivate}>Hacer privado</Button>{' '}
                    </div>
                    <div className="col-md">
                        <Button variant="warning" size="lg" block disabled onClick={this.makePublicOrPrivate}>Hacer público</Button>{' '}
                    </div>
                </>,
        });
        if (event.target.value === 'makePublic') {
            const changer = await changeCharacterPublic('yes', this.state.id);
            if (changer.status === 201){
                this.setState({bottomState: await obtainCharacterIsPublic(this.state.id)});
            } else {
                alert("Ha ocurrido un error, vuelva a intentarlo.");
            }
        }
        else if (event.target.value === 'makePrivate') {
            const changer = await changeCharacterPublic('no', this.state.id);
            if (changer.status === 201){
                this.setState({bottomState: await obtainCharacterIsPublic(this.state.id)});
            } else {
                alert("Ha ocurrido un error, vuelva a intentarlo.");
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