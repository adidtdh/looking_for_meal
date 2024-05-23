import { Link } from "react-router-dom"

const UserLink = ({ username, text, className }) => {

    const user_link = "/user/" + username
    return (
        <Link to={user_link} className={className}><p>{text}</p></Link>
    )
}

export default UserLink