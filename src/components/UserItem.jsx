import { useContext } from "react";
import context from "../context/Context";

function UserItem({ user, toggleBiz, deleteUser }) {
    const { color } = useContext(context)

    return (
        <div className={`col-5 shadow p-3 mb-5 rounded bg-body m-2 ${color !== 'dark' ? '' : 'text-white'}`}>
            <p><span className='fieldName'>First Name:</span> {user.name.first}</p>
            <p><span className='fieldName'>Last Name:</span> {user.name.last}</p>
            <p><span className='fieldName'>Email:</span>{user.email}</p>
            <p><span className='fieldName'>User id:</span>{user._id}</p>
            <p><span className='fieldName'>Status:</span>{user.isBusiness ? "Biz user" : "Regular user"}</p>
            <div>

                <button className="btn btn-primary m-1" onClick={() => toggleBiz(user)}>{user.isBusiness ? 'change to regular' : 'change to Biz'}</button>
                <button className="btn btn-danger m-1" onClick={() => deleteUser(user)}>Delete user</button>
            </div>
        </div>
    )

}

export default UserItem;