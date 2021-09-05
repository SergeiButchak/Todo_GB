import React from "react";
import Moment from "moment";


const TodoItem = ({todo}) => {
    Moment.locale("en");
    return (
        <tr>
            <td>
                {todo.description}
            </td>
            <td>
                {Moment(todo.naviDate).format("YYYY-MM-DD HH:mm")}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {

    return (
        <tbody>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Created
                </th>
            </tr>
            {/*{projects.name}*/}
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </tbody>

    )
}

export default TodoList;