
function TaskIndicator (props) {
    if (props.left === 0){
        return (
            <div className="task-indicator">
                <div>Total Tasks: <strong>{props.total}</strong></div>
                <div>Tasks Left: <strong className="all-done">DONE</strong></div>
            </div>
        )
    }
    return (
        <div className="task-indicator">
            <div>Total Tasks: <strong>{props.total}</strong></div>
            <div>Tasks Left: <strong>{props.left}</strong></div>
        </div>
    )
}

export default TaskIndicator;