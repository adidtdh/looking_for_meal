import { Link } from "react-router-dom"

const Navbar = ({ auth }) => {

    var Greeting = () => {
        if (auth) {
            return (
                <>
                    <Link to="/profile">Edit Profile</Link>
                    <form action="/auth/logout" method="POST">
                        <button type="logout">Logout</button>
                    </form>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )
        }
    }

    return (
        <header className="bg-slate-300">
            <nav className=" flex flex-row justify-between py-6 px-8">
                <Link to="/"><h1 className="font-bold uppercase text-xl">Looking For Meal</h1></Link>
                <Link to="/find">Find Table</Link>
                <Greeting />
            </nav>
        </header>
    )
}

export default Navbar