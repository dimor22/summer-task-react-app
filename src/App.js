import React from 'react';
import './App.css';
import UserTasks from "./components/UserTasks";
import RefreshBtn from "./components/RefreshBtn";


function App() {

    return(
        <React.Fragment>
            <RefreshBtn/>
            <UserTasks user="shaila"/>
            <UserTasks user="amaira"/>
        </React.Fragment>
    )
}

export default App;
