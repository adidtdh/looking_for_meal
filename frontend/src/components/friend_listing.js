import UserLink from "../components/user_link"
import FriendButton from "../components/friend_button"

const FriendListing = ({username, text, auth})=>{
    
    if(!auth){
        
        return <UserLink username={username} text={text}/>
    }
    
    return (
        <div className="flex flex-row">
            <UserLink username={username} text={text} className="text-nowrap hover:bg-blue-500 hover:text-gray-100 hover:shadow-lg rounded py-1 px-2 my-0.5 duration-200"/>
            <FriendButton username={username} className=""/>
        </div>
    )
    
}

export default FriendListing