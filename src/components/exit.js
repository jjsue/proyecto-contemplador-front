import React, { Component } from "react";
import { logOutCall } from './calls/api-calls';
import { BrowserRouter as Route, Redirect } from "react-router-dom";
export default class Exit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseState: null,
            toShow: null,
        }
    }
    async componentDidMount() {
        const response = await logOutCall();
        this.setState({
            responseState: response,
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.responseState !== this.state.responseState) {
            if (this.state.responseState.status === 204) {
                this.props.parentLogin()
                this.setState({
                    toShow:
                        <Redirect to="/" />
                });
            } else {

            }
        }
    }
    render() {
        return (
            <>
                {this.state.toShow}
            </>
        )
    }
}