import './style/loading.css';
import React, { Component } from "react";
import PnjCard from './pnjCard'
import { publicCharacterCall } from './calls/api-calls';
import { Switch } from 'react-router-dom';
const queryString = require('query-string');
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
            paginationFirstArrow: "page-item disabled",
            paginationSecondArrow: "page-item",
            paginationFirstNumber: 1,
            paginationFirstNumberClass: 'page-item active',
            paginationSecondNumber: 2,
            paginationSecondNumberClass: 'page-item',
            paginationThirdNumber: 3,
            paginationThirdNumberClass: 'page-item',
            paginationPage: 1,
            formName: undefined,
            formRace: undefined,
            formClass: undefined,
            formLevelMax: undefined,
            formLevelMin: undefined,
            formSort: undefined,
        }
    }
    componentDidMount() {
        this.pnjCall(this.queryBuilder(this.state.paginationPage));
    }
    pnjCall = async (qstring) => {
        this.setState({ responseState: await publicCharacterCall(qstring) });
        if (this.state.responseState.data.length > 0 && this.state.responseState.status === 200) {
            this.setState({ arrayToShow: null });
            let arrayVariable = []
            for (let i = 0; i < this.state.responseState.data.length; i++) {
                arrayVariable[i] = <PnjCard key={i} data={this.state.responseState.data[i]} />
            }
            this.setState({ arrayToShow: arrayVariable });
        }
    }
    queryBuilder = (skip) => {
        const myQuery = {}
        myQuery.skip = (parseInt(skip) - 1) * 8;
        myQuery.sort = this.state.formSort;
        myQuery.name = this.state.formName;
        myQuery.race = this.state.formRace;
        myQuery.class = this.state.formClass;
        myQuery.levelMax = this.state.formLevelMax;
        myQuery.levelMin = this.state.formLevelMin;
        myQuery.limit = 8;
        return queryString.stringify(myQuery)
    }
    pagination = (event) => {
        event.preventDefault();
        // if (parseInt(event.target.value) === this.state.paginationPage) {
        //     console.log(parseInt(event.target.value));
        // }
        if (event.target.value === 'previous' || event.target.value === 'next') {
            switch (event.target.value) {
                case 'previous':
                    if (this.state.paginationPage - 1 === 1) {
                        this.pnjCall(this.queryBuilder(1));
                        this.setState({ paginationPage: this.state.paginationPage - 1 });
                    }
                    else {
                        this.pnjCall(this.queryBuilder(parseInt(this.state.paginationPage) - 1));
                        this.setState({
                            paginationFirstNumber: this.state.paginationFirstNumber - 1,
                            paginationSecondNumber: this.state.paginationSecondNumber - 1,
                            paginationThirdNumber: this.state.paginationThirdNumber - 1,
                            paginationPage: this.state.paginationPage - 1,
                        });
                    }
                    break;
                case 'next':
                    if (this.state.paginationPage === 1) {
                        this.pnjCall(this.queryBuilder(parseInt(this.state.paginationPage) + 1));
                        this.setState({
                            paginationPage: this.state.paginationPage + 1,
                        });
                    } else {
                        this.pnjCall(this.queryBuilder(parseInt(this.state.paginationPage) + 1));
                        this.setState({
                            paginationFirstNumber: this.state.paginationFirstNumber + 1,
                            paginationSecondNumber: this.state.paginationSecondNumber + 1,
                            paginationThirdNumber: this.state.paginationThirdNumber + 1,
                            paginationPage: this.state.paginationPage + 1,
                        });
                    }
                    break;
                default:
                    break;
            }
        }
        if (!isNaN(event.target.value)) {
            if (parseInt(event.target.value) === 1) {
                this.setState({ paginationPage: this.state.paginationPage - 1 });
            } else {
                this.setState({
                    paginationFirstNumber: parseInt(event.target.value) - 1,
                    paginationSecondNumber: parseInt(event.target.value),
                    paginationThirdNumber: parseInt(event.target.value) + 1,
                    paginationPage: parseInt(event.target.value),
                });
            }
            this.pnjCall(this.queryBuilder(parseInt(event.target.value)));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.paginationPage > 1 && prevState.paginationPage !== this.state.paginationPage) {
            this.setState({
                paginationFirstNumberClass: 'page-item',
                paginationSecondNumberClass: 'page-item active',
                paginationThirdNumberClass: 'page-item',
                paginationFirstArrow: "page-item",
                paginationSecondArrow: "page-item",
            });
        }
        if (this.state.paginationPage === 1 && prevState.paginationPage !== this.state.paginationPage) {
            this.setState({
                paginationFirstNumberClass: 'page-item active',
                paginationSecondNumberClass: 'page-item',
                paginationThirdNumberClass: 'page-item',
                paginationFirstArrow: "page-item disabled",
                paginationSecondArrow: "page-item",
            });
        }
        if (prevState.responseState !== this.state.responseState) {
            if (this.state.responseState.data.length !== 8) {
                this.setState({
                    paginationThirdNumberClass: "page-item disabled",
                    paginationSecondArrow: "page-item disabled",
                });
            }
            else if (this.state.responseState.data.length === 8) {
                this.setState({
                    paginationThirdNumberClass: "page-item",
                    paginationSecondArrow: "page-item",
                });
            }
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
                        <li className={this.state.paginationFirstArrow}>
                            <button onClick={this.pagination} className="page-link" aria-label="Previous" value="previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        <li className={this.state.paginationFirstNumberClass}>
                            <button onClick={this.pagination} className="page-link" value={this.state.paginationFirstNumber}>{this.state.paginationFirstNumber}</button>
                        </li>
                        <li className={this.state.paginationSecondNumberClass}>
                            <button onClick={this.pagination} className="page-link" value={this.state.paginationSecondNumber}>{this.state.paginationSecondNumber}</button>
                        </li>
                        <li className={this.state.paginationThirdNumberClass}>
                            <button onClick={this.pagination} className="page-link" value={this.state.paginationThirdNumber}>{this.state.paginationThirdNumber}</button>
                        </li>
                        <li className={this.state.paginationSecondArrow}>
                            <button onClick={this.pagination} className="page-link" aria-label="Next" value="next">
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