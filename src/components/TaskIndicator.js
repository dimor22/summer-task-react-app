import React from 'react';

function TaskIndicator (props) {
    return (
        <React.Fragment>
            <div>Total Tasks: <strong>{props.total}</strong></div>
            <div>Tasks Left: <strong>{props.left}</strong></div>
        </React.Fragment>
    )
}

export default TaskIndicator;