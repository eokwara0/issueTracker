
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import URLSearchParams from 'url-search-params';
import IssueAdd from './IssueAdd.jsx';
import IssueTable from './IssueTable.jsx';
import IssueFilter from './IssueFilter.jsx';
import graphQLFetch from "./graphQLFetch.js";
import IssueDetail from './IssueDetail.jsx';
import { Route } from 'react-router-dom';


export default class IssueList extends React.Component{
    constructor(props){
        super(props);
        this.state = {issues : []};
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData()
    }
    componentDidUpdate(prevProps){
        const { location : { search : prevSearch } } = prevProps ;
        const { location : { search } } = this.props ;
        if ( prevSearch !== search ){
            this.loadData();
        }
    }

    async loadData() {
        const { location : { search }} = this.props;
        const params = new URLSearchParams(search);
        const vars = {};

        if (params.get('status')) vars.status = params.get('status');
        const effortMin = parseInt(params.get('effortMin') , 10)
        if ( !Number.isNaN(effortMin) ) vars.effortMin = effortMin;
        const effortMax = parseInt(params.get('effortMax') , 10);
        if ( !Number.isNaN(effortMax) ) vars.effortMax = effortMax;

        const query = `query issueList(
            $status: StatusType
            $effortMin : Int
            $effortMax : Int
            ){
            issueList (
            status : $status
            effortMin : $effortMin
            effortMax : $effortMax
            ){
                id title status owner
                created effort due
            }
        }`;
        const data = await graphQLFetch(query , vars );
        if(data){
            this.setState({issues: data.issueList});
        }
    }
    async createIssue(issue) {

        const query =  `mutation issueAdd($issue:IssueInputs!){
            issueAdd(issue: $issue){
                id
            }
        }`;

        const data = await graphQLFetch( query , { issue });
        if (data){
            this.loadData();
        }
    }
    

    render(){
        const { issues } = this.state;
        const { match }  = this.props ;
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter/>
                <hr/>
                <IssueTable issues={this.state.issues}/>
                <hr/>
                <IssueAdd createIssue={this.createIssue}/>
                <hr/>
                <Route path={`${match.path}/:id`} component={IssueDetail}/>
            </React.Fragment>
        );
    }
}