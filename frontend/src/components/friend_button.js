import { useEffect, useState } from "react"

const FriendButton = ({ username, className }) => {
  const [friendStatus, setFriendStatus] = useState(false)

  useEffect(() => {

    const fetch_friend_status = async () => {

      const response = await fetch("/user/" + username + "/friendcheck")
      const json = await response.json()

      if (response.ok) {
        setFriendStatus(json.friends)
      }


    }

    fetch_friend_status()

  }, [username])


  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/user/' + username + "/friend" + (friendStatus ? "/remove" : ""), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <form onSubmit={handle_submit} className= {className + " flex flex-row"}>
      <button className=" inline-block hover:shadow-lg bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded px-1 my-1 ml-1 mr-3 peer duration-200">{(friendStatus ? "-" : "+")}</button>
      <label className="bg-blue-500 text-gray-100 rounded py-0.5 px-1 scale-0 peer-hover:scale-100 duration-200 shadow-lg">{friendStatus ? "Remove" : "Add"} as Friend</label>
    </form>
  )
}

export default FriendButton