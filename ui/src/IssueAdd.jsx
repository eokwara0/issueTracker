
import React from 'react';
import PropTypes from 'prop-types';



export default class IssueAdd extends React.Component{
    
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner:form.owner.value, title:form.title.value,
            due: new Date(new Date().getTime() + 1000*60*60*24*10),
        }
        this.props.createIssue(issue);
        form.owner.value = "";form.title.value="";

    }
    render(){
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input className="owner" type="text" name="owner" placeholder="Owner" />
                <input className="title" type="text" name="title" placeholder="Title" />
                <button>Report</button>
            </form>
        );
    }
}