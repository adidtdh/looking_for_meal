import { useEffect, useState } from "react"
//import UserLink from "../components/user_link"
import FriendListing from "../components/friend_listing"

const TableView = ({ table, auth, className}) => {


  const table_name = table.name
  const table_users = table.users
  const table_public = table.public ? "public" : "private"



  const [users, setUsers] = useState(null)
  const [join, setJoin] = useState(false)


  useEffect(() => {

    const fetch_users =async () => {

      const list_users = await Promise.all(table_users.map(async (user_id) => {
        const response = await fetch("/user/id/" + user_id)
        const json = response.json()
        
        if (response.ok) {
          return json
        }

      }))
      


      const list_items = list_users.map((user) => {
        //const element = <li key={user.username}><UserLink username={user.username} text={user.first_name + " " + user.last_name + " (" + user.username + ")"}/></li>
        const element = <li key={user.username}><FriendListing auth={auth} username={user.username} text={user.first_name + " " + user.last_name + " (@" + user.username + ")"}/></li>
        return element
      })

      setUsers(list_items)
    }

    fetch_users()

  }, [table_users, auth, join])
  

  useEffect(()=>{
      
    setJoin(!table_users.includes(auth))

  }, [auth, table_users])




  const UsersList = ({className}) => {

    return <ul className={className}>{users}</ul>

  }


  const JoinButton = ({className}) => {
    if (!auth) {
      return (
        <button type="button" disabled>Sign in to Join</button>
      )
    }
    return (<form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await fetch('/api/table/join', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ table_id: table._id })
        });

      } catch (error) {
        console.error('Error:', error);
      }

    }}>
      <button className={className} type="submit">Join</button>
    </form>
    )


  }

  const LeaveButton = ({className}) => {
    if (!auth) {
      return (
        <button type="button" disabled>Sign in to Leave</button>
      )
    }
    return (<form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await fetch('/api/table/leave', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ table_id: table._id })
        });

      } catch (error) {
        console.error('Error:', error);
      }

    }}>
      <button className={className} type="submit">Leave</button>
    </form>
    )
  }


  const Button = ({className})=>{
    
    return join ? <JoinButton className={className}/> : <LeaveButton className={className}/>

  }
 





  return (
    <div className={className + " bg-slate-300 inline-block flex-col p-6 rounded-3xl shadow-xl border-orange-200 border-4 hover:scale-110 duration-200"}>
      <h3 className="text-3xl font-bold text-center">{table_name}</h3>
      <p className="font-semibold text-center">{table_public} table</p>

      <UsersList className="bg-gray-100 rounded-xl p-4 my-4 border border-gray-400"/>
    <Button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border rounded-xl shadow-md"/>


    </div>
  )
}

export default TableView