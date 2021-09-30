import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import axios from "axios";
import Footer from "./components/Footer";
import Main from "./components/Main";
import TodoList from "./components/Todo";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie"
import ProjectForm from "./components/ProjectForm";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

function getUrl(endPoint) {
    const BASE_API_URL = "http://127.0.0.1:8000/api/v1/";
    return (BASE_API_URL + endPoint + '/')
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "users": [],
            "projects": [],
            "todos": [],
            "login": "",
            "token": ""
        };
    }

    get_token(username, password) {
        axios.post("http://127.0.0.1:8000/token-auth/", {username: username, password: password})
            .then(response => {
                this.set_token(username, response.data['token'])
                window.location.assign("http://localhost:3000/")
            }).catch(error => alert("Неверный логин или пароль"))
    }

    is_authenticated() {
        return this.state.token != ''
    }


    set_token(login, token) {
        const cookies = new Cookies()
        cookies.set("token", token)
        cookies.set("login", login)
        this.setState({"token": token, "login": login}, () => this.load_data())
    }

    logout() {
        this.set_token('', '')
        window.location.assign("http://localhost:3000/")
        console.log("logout")
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get("token")
        const login = cookies.get("login")
        this.setState({"token": token, "login": login}, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        const get_todo_params = new URLSearchParams([['is_active', 'true']]);
        axios.get(getUrl('users'), {headers})
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

        axios.get(getUrl('projects'), {headers})
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

        axios.get(getUrl('todo'), {params: get_todo_params, headers})
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

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(getUrl(`projects/${id}`), {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(getUrl(`todo/${id}`), {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(name, repLink, workers) {
    const headers = this.get_headers()
    const data = {name: name, repLink: repLink, workers: workers}
    axios.post(getUrl(`projects`), data, {headers})
        .then(response => {
          let new_project = response.data
          const project = this.state.projects.filter((item) => item.id === new_project.id)[0]
          new_project.id = project
          this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
  }



    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()

    }

    render() {
        return (
            // <div>Main App</div>
            <div className="App">
                <BrowserRouter>
                    <Main instance={this}/>
                    <Switch>
                        <Route exact path='/' component={() => <h1>Welcome to TODO</h1>}/>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                    deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm
                            createProject={(name, repLink, workers) => this.createProject(name, repLink, workers)}
                            users={this.state.users}/>}/>
                        <Route exact path='/projects/:id'
                               component={() => <ProjectDetail projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList
                            todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
