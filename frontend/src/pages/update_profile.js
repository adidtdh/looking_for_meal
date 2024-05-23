const Profile = () => {
    return (
        <div>
            <h1>Edit Profile</h1>

            <form action="/auth/UPDATE" method="POST">
                <div>
                    <label for="first_name">Firstname</label>
                    <input type="text" id="first_name" name="first_name" />
                </div>
                <div>
                    <label for="last_name">Lastname</label>
                    <input type="text" id="last_name" name="last_name" />
                </div>
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="text" id="password" name="password" />
                </div>
                <div>
                    <label for="bio">Bio</label>
                    <input type="text" id="bio" name="bio" />
                </div>
                <div>
                    <label for="clean">How clean are you?</label>
                    <input type="range" min="1" max="100" class="slider" id="clean" name="clean" />
                </div>
                <div>
                    <label for="nice">How nice are you?</label>
                    <input type="range" min="1" max="100" class="slider" id="nice" name="nice" />
                </div>
                <div>
                    <label for="talk">How talkative are you?</label>
                    <input type="range" min="1" max="100" class="slider" id="talk" name="talk" />
                </div>
                <div>
                    <label for="smart">How smart are you?</label>
                    <input type="range" min="1" max="100" class="slider" id="smart" name="smart" />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Profile