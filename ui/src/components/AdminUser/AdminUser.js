import React from 'react'
import AdminUserView from "../AdminUserView/AdminUserView";

const AdminUser = ({user, refresh}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.lastName}</td>
            <td>{user.firstName}</td>
            <td>{user.role}</td>
            <td>
                <div>
                    <button className="btn btn-outline-info" data-toggle="modal"
                            data-target={"#userView-" + user.id}>Подробнее</button>
                    <AdminUserView user={user} id={"userView-" + user.id} refresh={refresh}/>
                </div>
            </td>
        </tr>
    )
};

export default AdminUser;