import React from 'react';
// import { MongoClient } from "mongodb";
import * as Realm from "realm-web";
import TaskIndicator from "./TaskIndicator";
import TaskList from "./TaskList";

class UserTasks extends React.Component {

    constructor(props) {
        super(props);
        this.handleTaskChange = this.handleTaskChange.bind(this)

        this.state = {
            db: null,
            user: this.props.user,
            indicator : {
                total: 0,
                left: 0
            },
            tasks : []
        } ;
    }

    handleTaskChange(id, btnStatus){

        let updatedTasks = [...this.state.tasks];

        // Update status
        updatedTasks.forEach( task => {
            let statusToPersist = '';
            if ( task._id === id ) {
                if ( btnStatus === 'not-completed') {
                    task.activity[this.state.user].status = 'completed';
                    statusToPersist = 'completed';
                } else {
                    task.activity[this.state.user].status = 'not-completed';
                    statusToPersist = 'not-completed';
                }

                // save to mongo db
                // Mongo DB call
                const REALM_APP_ID = "summer-app-bzevs"; // e.g. myapp-abcde
                const app = new Realm.App({ id: REALM_APP_ID });

                let mongoTasks = null;

                async function loginAnonymous() {
                    // Create an anonymous credential
                    const credentials = Realm.Credentials.anonymous();
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

                loginAnonymous().then( () => {

                    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
                    this.setState({db: mongodb});
                    const tasksRes = mongodb.db("summer_react_app").collection("tasks");

                    let oldTask = tasksRes.findOneAndUpdate({_id: id}, task );

                    oldTask.then(() => {
                        console.log(`task ${id} updated`);
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

        // Mongo DB call
        const REALM_APP_ID = "summer-app-bzevs"; // e.g. myapp-abcde
        const app = new Realm.App({ id: REALM_APP_ID });

        async function loginAnonymous() {
            // Create an anonymous credential
            const credentials = Realm.Credentials.anonymous();
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

        loginAnonymous().then( () => {

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
        return(
                <React.Fragment>
                    <TaskIndicator total={this.state.indicator.total}
                                   left={this.state.indicator.left}/>
                    <TaskList tasks={this.state.tasks} user={this.props.user}
                              onTaskChange={this.handleTaskChange}/>
                </React.Fragment>
            )
    }
}

export default UserTasks;