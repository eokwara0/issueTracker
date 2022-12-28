
import React from 'react';
import {Navbar, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { Link , NavLink , withRouter } from 'react-router-dom';
import { AlternateEmail, CheckBox, Close, Delete, DeleteOutline, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';

const IssueRow = withRouter(( { issue, location : { search }, closeIssue, deleteIssue, index,}) => {


    const selectLocaiton = { pathname : `/issues/${issue.id}` , search };
    const editTooltip = ( <Tooltip id="close-tooltip" placement='top' >Edit Issue</Tooltip> )
    const closeTooltip =( <Tooltip id="close-tooltip" placement="top" >Close Issue</Tooltip>);
    const deleteTooltip =( <Tooltip id="delete-tooltip" placement="top" >Delete Issue</Tooltip>);

    function onClose(e){
        e.preventDefault();
        closeIssue(index);
    }

    function onDelete(e) {
        e.preventDefault();
        deleteIssue(index);
    }


    const tableRow = (
            <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
            <NavLink to={selectLocaiton}>select</NavLink>
            {'|'}
            <Link to={`/edit/${issue.id}`}><Edit/></Link>
            {'|'}
            <OverlayTrigger delayShow={500} overlay={closeTooltip}>
                <Button variant="outlined" onClick={onClose}>
                    <Close/>
                </Button>
            </OverlayTrigger>
            {'  |  '}
            <OverlayTrigger delayShow={500} overlay={deleteTooltip}>
                <Button variant="outlined" color='secondary'  onClick={onDelete}>
                    <DeleteOutline/>
                </Button>
            </OverlayTrigger>
            </tr>
        
    )
    return (
            tableRow
    )
})


export default function  IssueTable({ issues, closeIssue, deleteIssue }){
    const issueRows = issues.map(( issue, index ) => (
        <IssueRow key={issue.id} issue={issue} closeIssue={closeIssue} deleteIssue={deleteIssue} index={index} />
    ));

    return (
        <div className='table' style={{ padding: "10px"}}>
            <Table  striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th><th>Status</th>
                        <th>Owner</th><th>Created</th>
                        <th>Effort</th><th>Due Date</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </Table>
        </div>
    );
}

// function IssueRow (props){
//         const issue = props.issue ;
//         return (
//             <tr>
//                 <td>{issue.id}</td>
//                 <td>{issue.status}</td>
//                 <td>{issue.owner}</td>
//                 <td>{issue.created.toDateString()}</td>
//                 <td>{issue.effort}</td>
//                 <td>{issue.due ? issue.due.toDateString() : ''}</td>
//                 <td>{issue.title}</td>
//                 <td><Link to={`/edit/${issue.id}`}>Edit</Link></td>
//             </tr>
//         )
// }

