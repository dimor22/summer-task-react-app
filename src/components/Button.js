import React from 'react';

class Button extends React.Component {

    render(){

        let { activity, user, id } = this.props;

        let buttonLabel = 'Incomplete';
        let buttonStatus = "Incomplete"

        let userTaskStatus = activity[user].status;
        let time = activity[user].time;

        if (userTaskStatus === 'completed') {
            buttonStatus = 'completed';
            buttonLabel = String.fromCodePoint('0x2714') + ' ' + time;
        }

        return (
            <button
                data-status={buttonStatus}
                type="button"
                onClick={ () => {
                    const date = new Date();
                    const [day, hour, minutes, seconds] = [date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()];
                    let weekDay = '';
                    switch (day) {
                        case 0:
                            weekDay = 'Sun';
                            break;
                        case 1:
                            weekDay = 'Mon';
                            break;
                        case 2:
                            weekDay = 'Tue';
                            break;
                        case 3:
                            weekDay = 'Wed';
                            break;
                        case 4:
                            weekDay = 'Thu';
                            break;
                        case 5:
                            weekDay = 'Fri';
                            break;
                        case 6:
                            weekDay = 'Sat';
                            break;
                    }
                    time = `${weekDay}, ${hour}:${minutes}:${seconds}`;

                    this.props.onTaskChange(id, userTaskStatus, time)
                }
                }>{buttonLabel}
            </button>
        );
    }
}

export default Button;