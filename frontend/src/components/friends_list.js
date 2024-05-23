import { useEffect, useState } from "react"
import FriendListing from "../components/friend_listing"


const FriendsList = ({friends_ids, auth, className }) => {
  const [friends, setFriends] = useState("No friends")


  useEffect(() => {

    const fetch_friends =async () => {
        
    if(!friends_ids.length){
        return
    }

      const list_users = await Promise.all(friends_ids.map(async (friend_id) => {
        const response = await fetch("/user/id/" + friend_id)
        const json = response.json()
        
        if (response.ok) {
          return json
        }

      }))


      const list_items = list_users.map((user) => {
        const element = <li key={user.username}><FriendListing auth={auth} username={user.username} text={user.first_name + " " + user.last_name + " (" + user.username + ")"}/></li>
        return element
      })

      setFriends(list_items)
    }

    fetch_friends()

  }, [auth, friends_ids])

  


  const UsersList = ({className}) => {

    return <ul className={className}>{friends}</ul>

  }



  return (
    <div className={className + " inline-block bg-slate-300 border-4 border-orange-200 rounded-3xl py-6 px-6 shadow-md"}>
      <h3 className="font-semibold text-3xl text-center">Friends</h3>
      <UsersList className="bg-gray-100 rounded-xl p-4 my-4 border border-gray-400"/>

    </div>
  )
}

export default FriendsList