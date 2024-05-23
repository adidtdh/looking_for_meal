const Login = () => {
    return (
        <div>
            <h1>Login</h1>

            <form action="/auth/login" method="POST">
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="text" id="password" name="password" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>


    )
}

export default Login