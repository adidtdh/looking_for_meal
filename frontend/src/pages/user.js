import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import UserLink from "../components/user_link"
import TableView from "../components/table_view"
import FriendsList from "../components/friends_list"


const User = ({ auth }) => {
    const { username } = useParams()
    const [user, setUser] = useState(null)
    const [table, setTable] = useState(null)
    const [friendIds, setFriendIds] = useState({})

    useEffect(() => {

        const fetch_user = async () => {
            const response = await fetch("/user/" + username)
            const json = await response.json()

            if (response.ok) {
                setUser(json)
            }
        }

        fetch_user()

    }, [username])


    useEffect(() => {

        const fetch_table = async () => {
            const response = await fetch("/user/" + username + "/table")

            if (response.status !== 200) {
                setTable(null)
                return
            }
            const json = await response.json()

            if (response.ok) {
                setTable(json)
            }
        }

        fetch_table()

    }, [username])

    useEffect(() => {

        const fetch_friendIds = async () => {
            const response = await fetch("/user/" + username + "/friends")
            const json = await response.json()

            if (response.ok) {
                setFriendIds(json)
            }
        }

        fetch_friendIds()


    }, [username])




    const UserBox = ({ className }) => {
        if (!user) {
            return <p>Could not find user</p>
        } else {
            return <div className={className}>
                <h2 className="text-6xl font-extrabold">
                    {user.first_name} {user.last_name}
                </h2>
                <h4 className="text-gray-500 text-2xl font-semibold"><UserLink username={user.username} text={"@" + user.username} /></h4>
                <p>{user.bio}</p>
            </div>
        }
    }


    const UserTable = ({ className }) => {
        if (table == null) {
            return (
                <p>User is not currently at table</p>
            )
        } else {
            return <TableView table={table} auth={auth} className={className} />
        }
    }


    return (
        <div className="">

            <UserBox className="m-12 text-center" />

            <div className="flex flex-row">
                <UserTable className="m-12" />
                <FriendsList friends_ids={friendIds} auth={auth} className="m-12 ml-auto hover:scale-110 duration-200" />
            </div>
        </div>
    )
}

export default User