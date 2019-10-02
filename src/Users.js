import React from "react"

const Users = (props) => {
    return (
        <div className="users-container">
            <h2>User List</h2>
            <p>{props.userList.name}</p>
        </div>
    )
}

export default Users