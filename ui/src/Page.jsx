import React from "react";
import Contents from "./contents.jsx";
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, OverlayTrigger, Glyphicon } from "react-bootstrap";
import { Stack } from "@mui/material";
import { Tooltip , NavDropdown, MenuItem } from "react-bootstrap";

function NavBar(){
    return (
        // <nav>
        //     {/* <a href="/">Home</a> */}
        //     <NavLink exact to="/">Home</NavLink>
        //     {/* {'|'} */}
        //     {/* <a href="/#/issues">Issue</a> */}
        //     <NavLink to="/issues">Issue List</NavLink>
        //     {/* {'|'} */}
        //     {/* <a href="/#/report">Report</a> */}
        //     <NavLink to="/report">Report</NavLink>
        // </nav>

        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Issue Tracker</Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight={false}>
                <Stack direction="horizontal"> 
                    <Navbar.Link href="/">Home</Navbar.Link>
                    <Navbar.Link href="/issues">Issue List</Navbar.Link>
                    <Navbar.Link href="/report">Report</Navbar.Link>
                </Stack>
            </Nav>
            <Nav pullRight>
                <NavItem>
                    <OverlayTrigger placement="bottom" delayShow={1000} overlay={ <Tooltip id="create-issue">Create Issue</Tooltip>}><Glyphicon glyph="plus"/></OverlayTrigger>
                </NavItem>
                <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-vertical" />} noCaret>
                    <MenuItem>About</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
        
    )
}

function Footer() {
    return (
        <small>
            <p className="text-center">
                Full source code available at this
                {' '}
                <a href="https://github.com/eokwara0/issueTracker">GitHub repository</a>
            </p>
        </small>
    )
}

export default function Page(){
    return (
        <div>
            <NavBar/>
            <Contents/>
            <Footer/>
        </div>
    )
}