import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/Users";
import axios from "axios";
import Footer from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "users": []
        };
    }

    componentDidMount() {
        // const users = [
        //     {
        //         "username": "django",
        //         "first_name": "dsfa",
        //         "last_name": "dfasdlf",
        //         "email": "fjsdlfjls"
        //     },
        //     {
        //         "username": "sergey",
        //         "first_name": "dsfa",
        //         "last_name": "dfasdlf",
        //         "email": "fjsdlfjls"
        //     },
        //     {
        //         "username": "test1",
        //         "first_name": "dsfa",
        //         "last_name": "dfasdlf",
        //         "email": "fjsdlfjls"
        //     }
        // ]
        // this.setState(
        //     this.state = {
        //         "users": users
        //     }
        // )

        axios.get('http://127.0.0.1:8000/api/users')
            .then(
                response => {
                    const users = response.data
                    this.setState(
                        {
                            "users": users
                        }
                    )
                }
            )
            .catch(error => console.log(error))

    }

    render() {
        return (
            // <div>Main App</div>
            <div>
                <UserList users={this.state.users}/>
                <Footer />
            </div>
        )
    }
}

export default App;
