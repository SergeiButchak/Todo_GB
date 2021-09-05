import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import axios from "axios";
import Footer from "./components/Footer";
import Main from "./components/Main";
import TodoList from "./components/Todo";
import {BrowserRouter, Route} from "react-router-dom";

function getUrl(endPoint) {
    const BASE_API_URL = "http://127.0.0.1:8000/api/";
    return (BASE_API_URL + endPoint + '/')
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "users": [],
            "projects": [],
            "todos": []
        };
    }

    componentDidMount() {

        axios.get(getUrl('users'))
            .then(
                response => {
                    const users = response.data
                    this.setState(
                        {
                            "users": users.results
                        }
                    )
                }
            )
            .catch(error => console.log(error))

        axios.get(getUrl('projects'))
            .then(
                response => {
                    const projects = response.data
                    this.setState(
                        {
                            "projects": projects.results
                        }
                    )
                }
            )
            .catch(error => console.log(error))

        axios.get(getUrl('todo'))
            .then(
                response => {
                    const todos = response.data
                    this.setState(
                        {
                            "todos": todos.results
                        }
                    )
                }
            )
            .catch(error => console.log(error))

    }

    render() {
        return (
            // <div>Main App</div>
            <div className="App">
                <BrowserRouter>
                <Main />
                    <Route exact path='/' component={() => <h1>Welcome to TODO</h1>} />
                    <Route exact path='/users' component={() => <UserList users={this.state.users}/>} />
                    <Route exact path='/projects' component={() =>  <ProjectList projects={this.state.projects}/>} />
                    <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />} />
                </BrowserRouter>
                <Footer />
            </div>
        )
    }
}

export default App;
