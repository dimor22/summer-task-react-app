import React from 'react';

class Button extends React.Component {

    render(){

        let { activity, user, id } = this.props;

        let buttonLabel = 'Incomplete';

        let userTaskStatus = activity[user].status;

        if (userTaskStatus === 'completed') {
            buttonLabel = 'Completed';
        }

        return (
            <button
                type="button"
                onClick={ () => this.props.onTaskChange(id, userTaskStatus)}>{buttonLabel}
            </button>
        );
    }
}

export default Button;