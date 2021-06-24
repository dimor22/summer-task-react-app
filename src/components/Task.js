import Button from './Button';

import React from 'react';

class Task extends React.Component {

    render() {

        const { activity, user, id, onTaskChange } = this.props

        return (
            <React.Fragment>
                <div className="title">
                    Task title
                </div>
                <div className="desc">
                    Task description goes here
                </div>
                <Button activity={activity}
                        user = {user}
                        id={id} onTaskChange={onTaskChange}/>
            </React.Fragment>
        );
    }
}

export default Task;