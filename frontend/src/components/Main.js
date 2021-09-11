import React from "react";
import {Link} from "react-router-dom";


const Main = (param) => {
    return (
        <div className="main">
                <nav>
                    <ul className={"hr"}>
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
                        <li>
                            {param.instance.is_authenticated() ? <button onClick={()=>param.instance.logout()}>Logout</button> : <Link to='/login'>Login</Link>}

                        </li>
                        <li>
                            {param.instance.is_authenticated() ? param.instance.state.login : ''}
                        </li>

                    </ul>
                </nav>
            <hr/>
        </div>
    )
}

export default Main;