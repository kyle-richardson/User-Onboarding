import React from "react"

const Users = (props) => {
    return (
        <div className="users-container">
            <h2>User List</h2>
            {props.users.map(user=><div key={user.id}>{user.name}</div>)}
        </div>
    )
}

export default Users