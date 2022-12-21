import React from 'react';
import { Link } from 'react-router-dom';
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
                {/* <a href="/#/issues">All Issues</a> */}
                <Link to="/issues">All Issues</Link>
                {/* {' | '} */}
                {/* <a href="/#/issues?status=New">New Issues</a> */}
                <Link to={{pathname: '/issues' , search: '?status=New'}}>New Issue</Link>
                {/* {' | '} */}
                {/* <a href="/#/issues?status=Assigned">Assigned Issues</a> */}
                <Link to={{pathname: '/issues' , search:'?status=Assigned'}}>Assigned Issues</Link>
            </div>
        );
    }
}