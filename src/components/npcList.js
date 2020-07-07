import './style/loading.css';
import React, { Component } from "react";
import PnjCard from './pnjCard'
import {publicCharacterCall} from './calls/api-calls';
export default class NpcList extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
    }
    async componentDidMount(){
        this.setState({responseState: await publicCharacterCall()});
        console.log(this.state.responseState);
        if (this.state.responseState.data.length > 0 && this.state.responseState.status === 200){
            this.setState ({arrayToShow: null});
            let arrayVariable = []
            for(let i = 0; i < this.state.responseState.data.length; i++){
                arrayVariable[i] = <PnjCard key={i} data={this.state.responseState.data[i]}/>
            }
            this.setState({arrayToShow: arrayVariable});
        }
    }
    render() {
        return (
            <>
                {/* <!-- Page Content --> */}
                <div className="container">

                    {/* <!-- Page Heading --> */}
                    <h1 className="my-4">Listado de PNJ</h1>
                    <div className="row">
                        {this.state.arrayToShow}
                    </div>
                    {/* <!-- /.row --> */}
                    {/* <!-- Pagination --> */}
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">1</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">2</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">3</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* <!-- /.container --> */}
            </>
        )
    }
}