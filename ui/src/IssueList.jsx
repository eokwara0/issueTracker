
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
import { Panel } from 'react-bootstrap';
import SnackBar from './snackBar.jsx';




export default class IssueList extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            issues : [],
            alert: {
                color : 'info',
                message : "",
                open : false,
            }
        };

        this.createIssue = this.createIssue.bind(this);
        this.closeIssue = this.closeIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.showSnack = this.showSnack.bind(this);
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

    closeAlert(){
        this.setState({ alert : { open : false }});
    }

    showSnack( message = '', color = 'info' , open = false ){
            this.setState({
              alert: {
                color: color,
                message: message,
                open: open,
              },
            });

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
        const data = await graphQLFetch(query , vars , this.showSnack);
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

        const data = await graphQLFetch( query , { issue }, this.showSnack);
        if (data){
            this.loadData();
            this.showSnack("Issue Has been Loaded Ⓜ️", "success", true);
        }
    }

    async closeIssue(index){

        const query = `mutation issueClose($id: Int! , $changes : IssueUpdateInputs!) {
            issueUpdate(id:$id , changes:$changes) {
                id title status owner
                effort created due description
            }
        }`;
        const changes = { status : "Closed"};
        const { issues } = this.state;
        const data = await graphQLFetch( query , { id : issues[index].id , changes : changes }, this.showSnack);

        if (data){
            this.setState(( prevState) => {
                const newList = [...prevState.issues];
                newList[index] = data.issueUpdate;
                return { issues : newList };
            })
            this.showSnack("Issue has been closed 🚀👻", "info", true);
        }else{
            this.loadData();
        }
    }

    async deleteIssue(index){
        const query = `mutation issueDelete($id:Int!){
            issueDelete(id: $id)
        }`;


        const { issues } = this.state;
        const { location : { pathname , search } , history } = this.props;
        const { id } = issues[index];
        const data = await graphQLFetch( query , { id }, this.showSnack );
        if (data && data.issueDelete){
            this.setState( prevState => {
                const newList = [...prevState.issues ];
                if (pathname === `/issues/${id}`){
                    history.push({ pathname : '/issues' , search });
                }
                newList.splice(index,1);
                return { issues: newList }
            });
            this.showSnack("Issue has been deleted 🚀👻", "success", true);
        
        }else {
            this.loadData();

            this.showSnack(
              "An Error occured while deleting the issue 🚀👻",
              "error",
              true
            );
        }
    }
    

    render(){
        const { issues } = this.state;
        const { match }  = this.props ;
        const { alert } = this.state;
        return (
            <React.Fragment>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Filter</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible={true}>
                        <IssueFilter/>
                    </Panel.Body>
                </Panel>
                <hr/>
                <IssueTable issues={issues} closeIssue={this.closeIssue} deleteIssue={this.deleteIssue}/>
                <IssueAdd createIssue={this.createIssue}/>
                <Route path={`${match.path}/:id`} component={IssueDetail}/>
                <SnackBar alert={alert} closeAlert={this.closeAlert}/>
            </React.Fragment>
        );
    }
}

