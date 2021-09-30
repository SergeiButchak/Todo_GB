import React from "react";
import Moment from "moment";
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    Moment.locale("en");
    return (
        <tbody>
        <tr>
            <td>
                {todo.description}
            </td>
            <td>
                {Moment(todo.naviDate).format("YYYY-MM-DD HH:mm")}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
        </tbody>
    )
}

const TodoList = ({todos, deleteTodo}) => {

    return (
        <div>
            <table border={"1px"} cellPadding={"5px"} cellSpacing={"0"}>
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Created
                    </th>
                    <th></th>
                </tr>
                </thead>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default TodoList;