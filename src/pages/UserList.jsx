import UserItem from "../components/UserItem";
import { useEffect, useState } from "react";
import userService from "../services/userService";
import Spinner from "../components/common/Spinner";

function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getallUsers()
    }, [])



    async function getallUsers() {
        const res = await userService.getAllUsers()
        const users = res.data.slice(0, 50).filter(u => !u.email.includes('tamar@mail'));
        const myUsers = res.data.filter(u => u.email.includes('tamar@mail'))
        setUsers([...myUsers, ...users])

        setLoading(false)

    }
    async function toggleBiz(user) {
        setLoading(true)
        const res = await userService.toggleUserType(user._id)
        const temp = users.filter(u => u._id !== user._id);
        setUsers([res.data, ...temp])
        setLoading(false)
    }
    async function deleteUser(user) {
        setLoading(true)
        const res = await userService.deleteUser(user._id)
        const temp = users.filter(u => u._id !== user._id)
        setUsers(temp)
        setLoading(false)

    }
    if (loading) { return <Spinner /> }
    return (
        <div className="">

            <div className="row justify-content-center gap-1">
                {users.map(user => {
                    return <UserItem user={user} toggleBiz={toggleBiz} deleteUser={deleteUser} />

                })

                }
            </div>
        </div>

    )
}

export default UserList
