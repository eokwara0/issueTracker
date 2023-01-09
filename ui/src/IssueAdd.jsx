
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';


/** 
 * Issue Add component
 * A form for adding new issues
 *  */
export default class IssueAdd extends React.Component{
    
    constructor(){
        super();
        // method binding
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /** handles button submit */
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
            <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Owner:</ControlLabel>
                    {' '}
                    <FormControl type="text" name="owner"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Title:</ControlLabel>
                    {' '}
                    <FormControl type="text" name="title"/>
                </FormGroup>
                {' '}
                <Button bsStyle='primary' type="submit">Add</Button> 
            </Form>
        );
    }
}