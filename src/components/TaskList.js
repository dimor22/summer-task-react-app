import Task from './Task';

import React from 'react';

class TaskList extends React.Component {



    render() {
        const { user, tasks, onTaskChange } = this.props;
        const taskItems = tasks.map( (task) =>

                <li key={task._id}>
                    <Task
                          id={task._id}
                          user={user}
                          activity={task.activity}
                          onTaskChange={onTaskChange}/>
                </li>

        );

        return (
            <ul>
                {taskItems}
            </ul>
        );
    }
}

export default TaskList;