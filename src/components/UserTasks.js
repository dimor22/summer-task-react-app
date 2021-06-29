import React from 'react';
// import { MongoClient } from "mongodb";
import * as Realm from "realm-web";
import TaskIndicator from "./TaskIndicator";
import TaskList from "./TaskList";
import UserImage from "./UserImage";
import RefreshBtn from "./RefreshBtn";
import realmKey from "../private/realmKey";

class UserTasks extends React.Component {

    constructor(props) {
        super(props);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.updateList = this.updateList.bind(this);

        this.state = {
            db: null,
            user: this.props.user,
            indicator : {
                total: 0,
                left: 0
            },
            tasks : [],
            timeStamp: ''
        } ;
    }

    handleTaskChange(id, btnStatus, time){

        let updatedTasks = [...this.state.tasks];

        // Update status
        updatedTasks.forEach( task => {

            if ( task._id === id ) {
                if ( btnStatus === 'not-completed') {
                    task.activity[this.state.user].status = 'completed';
                    task.activity[this.state.user].time = time;

                } else {
                    task.activity[this.state.user].status = 'not-completed';
                    task.activity[this.state.user].time = time;

                }

                // save to mongo db
                // Mongo DB call
                const REALM_APP_ID = "summer-app-bzevs"; // e.g. myapp-abcde
                const app = new Realm.App({ id: REALM_APP_ID });

                let mongoTasks = null;

                async function loginApiKey(apiKey) {
                    // Create an API Key credential
                    const credentials = Realm.Credentials.apiKey(apiKey);
                    try {
                        // Authenticate the user
                        const user = await app.logIn(credentials);
                        // `App.currentUser` updates to match the logged in user
                        //assert(user.id === app.currentUser.id)
                        return user
                    } catch(err) {
                        console.error("Failed to log in", err);
                    }
                }

                loginApiKey(realmKey).then(() => {

                    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
                    this.setState({db: mongodb});
                    const tasksRes = mongodb.db("summer_react_app").collection("tasks");

                    let oldTask = tasksRes.findOneAndUpdate({_id: id}, task );

                    oldTask.then(() => {
                    }).catch(err=>console.log(err))

                })

            }
        });

        // Update indicator
        let count = 0;
        updatedTasks.forEach( task => {
            if ( task.activity[this.state.user].status === 'not-completed') {
                count++;
            }
        });

        this.setState({tasks: updatedTasks});
        this.setState({indicator: {total: updatedTasks.length, left: count}})
    }

    componentDidMount() {

        this.getList();

    }

    updateList(){

        const date = new Date();
        const [day, hour, minutes, seconds] = [date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];

        this.setState({
            timeStamp: `${day}, ${hour}:${minutes}:${seconds}`
        });

        this.getList();
    }

    getList(){
        // Mongo DB call
        const REALM_APP_ID = "summer-app-bzevs"; // e.g. myapp-abcde
        const app = new Realm.App({ id: REALM_APP_ID });

        async function loginApiKey(apiKey) {
            // Create an API Key credential
            const credentials = Realm.Credentials.apiKey(apiKey);
            try {
                // Authenticate the user
                const user = await app.logIn(credentials);
                // `App.currentUser` updates to match the logged in user
                //assert(user.id === app.currentUser.id)
                return user
            } catch(err) {
                console.error("Failed to log in", err);
            }
        }

        loginApiKey(realmKey).then(() => {
            const mongodb = app.currentUser.mongoClient("mongodb-atlas");
            this.setState({db: mongodb});
            const tasksRes = mongodb.db("summer_react_app").collection("tasks");
            const tasks = tasksRes.find();
            tasks.then(tasks => {
                this.setState({tasks: tasks});

                // Update indicator
                let count = 0;
                tasks.forEach( task => {
                    if ( task.activity[this.state.user].status === 'not-completed') {
                        count++;
                    }
                });

                this.setState({indicator: {total: tasks.length, left: count}})
            })
        })
    }

    render() {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return(
                <div className="task-list">
                    <div className="tasks-header">
                        <UserImage user={this.props.user}/>
                        <div>
                            <RefreshBtn update={this.updateList}/>
                            <h1>{capitalizeFirstLetter(this.state.user)}</h1>
                        </div>
                    </div>
                    <TaskIndicator total={this.state.indicator.total}
                                   left={this.state.indicator.left}/>
                    <TaskList tasks={this.state.tasks} user={this.props.user}
                              onTaskChange={this.handleTaskChange}/>
                </div>
            )
    }
}

export default UserTasks;