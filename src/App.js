import React from 'react';
import './App.css';
import UserTasks from "./components/UserTasks";


function App() {

    return(
        <React.Fragment>
          <UserTasks user="shaila"/>
          <UserTasks user="amaira"/>
        </React.Fragment>
    )
}

export default App;
