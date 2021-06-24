import Button from './Button';

import React from 'react';

class Task extends React.Component {

    render() {

        const { activity, user, id, onTaskChange, task } = this.props

        return (
            <React.Fragment>
                <div className="title">
                    {task.title}
                </div>
                <div className="desc">
                    {task.desc}
                </div>
                <Button activity={activity}
                        user = {user}
                        id={id}
                        onTaskChange={onTaskChange}/>
            </React.Fragment>
        );
    }
}

export default Task;