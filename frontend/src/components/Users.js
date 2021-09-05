import React from "react";

const User = ({user}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.firstName}
                </td>
                <td>
                    {user.lastName}
                </td>
                <td>
                    {user.email}
                </td>
            </tr>
        </tbody>
    )
}

const UserList = ({users}) => {
    return (
        <table border={"1px"} cellPadding={"5px"} cellSpacing={"0"}>
            <thead>
                <tr>
                    <th>
                        Username
                    </th>
                    <th>
                        First name
                    </th>
                    <th>
                        Last name
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
            </thead>
            {users.map((user) => <User user={user} />)}
        </table>

    )
}

export default UserList;