import React from 'react';
import { Switch , Route , Redirect } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';



/** default route if the route does not meet any of the defined routes */
const NotFound = () => <h1>👻🙅🏽‍♀️⚔️🤖🚀🚀🐫🐔 Not Found!! </h1>;

/**
 * @Content Component
 * @param props
 * @returns Switch Component containing Routes
 */
export default function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/issues"/>
            <Route path="/issues" component={IssueList} />
            <Route path="/report" component={IssueReport} />
            <Route path="/edit/:id" component={IssueEdit} />
            <Route component={NotFound}/>
        </Switch>
    );
};