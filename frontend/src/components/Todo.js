import React from "react";
import Moment from "moment";


const TodoItem = ({todo}) => {
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
            </tr>
        </tbody>
    )
}

const TodoList = ({todos}) => {

    return (
        <table border={"1px"} cellPadding={"5px"} cellSpacing={"0"}>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Created
                    </th>
                </tr>
            </thead>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>

    )
}

export default TodoList;