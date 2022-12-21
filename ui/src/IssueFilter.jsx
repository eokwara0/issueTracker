import React from 'react';

export default class IssueFilter extends React.Component{
    constructor( props){
        super(props)
        this.state = {
            info : "This is a placeholder for issue filter.",
        }
    }
    render(){
        return (
            <div>
                <a href="/#/issues">All Issues</a>
                {' | '}
                <a href="/#/issues?status=New">New Issues</a>
                {' | '}
                <a href="/#/issues?status=Assigned">Assigned Issues</a>
            </div>
        );
    }
}