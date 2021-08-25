import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/Users";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "users": []
        };
    }

    componentDidMount() {
        const users = [
            {
                "username": "django",
                "first_name": "dsfa",
                "last_name": "dfasdlf",
                "email": "fjsdlfjls"
            },
            {
                "username": "sergey",
                "first_name": "dsfa",
                "last_name": "dfasdlf",
                "email": "fjsdlfjls"
            },
            {
                "username": "test1",
                "first_name": "dsfa",
                "last_name": "dfasdlf",
                "email": "fjsdlfjls"
            }
        ]

        this.setState(
            this.state = {
                "users": users
            }
        )
    }

    render() {
        return (
            // <div>Main App</div>
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

export default App;
