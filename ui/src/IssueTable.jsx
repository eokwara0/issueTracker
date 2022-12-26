
import React from 'react';
import { Link , NavLink , withRouter } from 'react-router-dom';

const IssueRow = withRouter(( { 
    issue, 
    location : { search },
    closeIssue,
    index,
    }) => {
    const selectLocaiton = { pathname : `/issues/${issue.id}` , search };
    return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
                <Link to={`/edit/${issue.id}`}>Edit</Link>
                    {' | '}
                <NavLink to={selectLocaiton}>Select</NavLink>
                { '| ' }
                <button type="button" onClick={() => { closeIssue( index );}}>
                    Close
                    </button>
            </tr>
        )
})


export default function  IssueTable({ issues, closeIssue }){
    const issueRows = issues.map(( issue, index ) => (
        <IssueRow
        key={issue.id}
        issue={issue}
        closeIssue={closeIssue}
        index={index}
        />
    ));
    return (
        <table style={{borderCollapse: "collapse"}}>
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
        </table>
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

