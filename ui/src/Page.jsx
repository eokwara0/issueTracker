import React from "react";
import Contents from "./contents.jsx";


function NavBar(){
    return (
        <nav>
            <a href="/">Home</a>
            {'|'}
            <a href="/#/issues">Issue</a>
            {'|'}
            <a href="/#/report">Report</a>
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