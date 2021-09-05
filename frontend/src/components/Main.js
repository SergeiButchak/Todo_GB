import React from "react";
import {HashRouter, Link} from "react-router-dom";


const Main = () => {
    return (

        <div className="main">
            <HashRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Main</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/projects">Projects</Link>
                        </li>
                        <li>
                            <Link to="/todo">Todos</Link>
                        </li>
                    </ul>
                </nav>
            </HashRouter>
            <hr/>
        </div>
    )
}

export default Main;