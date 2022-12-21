import React from "react";
import Contents from "./contents.jsx";
import { NavLink } from 'react-router-dom';


function NavBar(){
    return (
        <nav>
            {/* <a href="/">Home</a> */}
            <NavLink exact to="/">Home</NavLink>
            {/* {'|'} */}
            {/* <a href="/#/issues">Issue</a> */}
            <NavLink to="/issues">Issue List</NavLink>
            {/* {'|'} */}
            {/* <a href="/#/report">Report</a> */}
            <NavLink to="/report">Report</NavLink>
        </nav>
    )
}

export default function Page(){
    return (
        <div>
            <NavBar/>
            <Contents/>
        </div>
    )
}