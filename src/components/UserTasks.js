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

        console.log(updatedTasks);

        // Update status
        updatedTasks.forEach( task => {

            console.log(task._id);

            if ( task._id === id ) {
                if ( btnStatus === 'not-completed') {
                    task.activity[this.state.user].status = 'completed';
                } else {
                    task.activity[this.state.user].status = 'not-completed';
                }
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

        // These come from third party service mongo db
        let originalTasks =  [
            {
                id: 1,
                title: 'task title',
                desc: 'task description goes here',
                activity:
                        {
                            shaila: {
                                status: "not-completed",
                                time: "2021-06-01"
                            },
                            amaira: {
                                status: "not-completed",
                                time: "2021-06-01"
                            },
                            benjamin: {
                                status: "not-completed",
                                time: "2021-06-01"
                            }
                        }
            },
            {
                id : 2,
                title : 'task title',
                desc : 'task description goes here',
                activity:
                    {
                        shaila: {
                            status: "not-completed",
                            time: "2021-06-01"
                        },
                        amaira: {
                            status: "not-completed",
                            time: "2021-06-01"
                        },
                        benjamin: {
                            status: "not-completed",
                            time: "2021-06-01"
                        }
                    }
            }
        ];

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

            const tasks = tasksRes.find();
            tasks.then(tasks => {
                console.log(tasks)
                mongoTasks = tasks;

                this.setState({tasks: mongoTasks});
                this.setState({indicator: {total: mongoTasks.length, left: mongoTasks.length}})
            })

        })

        // tasks.then((tasks) =>{
        //     let task = tasks.find({title:"Do your bed 5'"})
        //     task.then(task=>console.log(task));
        //
        //     let task2 = tasks.find({title:"Personal Grooming 20'"})
        //     task2.then(task=>console.log(task2));
        // })



        // async function findTask() {
        //     try{
        //         tasks = mongodb.db("summer_app").collection("tasks");
        //         const task = await tasks.findOne({ title:"Do your bed 5'" });
        //
        //     } catch ( err ) {
        //         console.log("Failed to fetch task", err);
        //     }
        // }
        //
        // findTask().then( task => {
        //     console.log(task);
        // })





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