import React from 'react';

function TaskIndicator (props) {
    return (
        <div className="task-indicator">
            <div>Total Tasks: <strong>{props.total}</strong></div>
            <div>Tasks Left: <strong>{props.left}</strong></div>
        </div>
    )
}

export default TaskIndicator;