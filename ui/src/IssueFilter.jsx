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
                {this.state.info}
            </div>
        );
    }
}