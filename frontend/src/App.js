import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';

// pages and componenets
import Navbar from "./components/navbar"

import Root from "./pages/root"
import Login from "./pages/login"
import Signup from "./pages/signup"
import FindTable from "./pages/find_table"
import User from "./pages/user"
import Profile from "./pages/update_profile"


function App() {

  const [auth, setAuth] = useState(false);

  const fetch_auth = async () => {
    const response = await fetch("/auth")
    const json = await response.json()


    if (response.ok) {
      setAuth(json.authenticated)
    }

  }

  fetch_auth();


  return (
    <div className="App text-gray-600 min-h-screen ">
      <BrowserRouter>
        <div className='pages bg-white mx-80 shadow-2xl min-h-screen'>
          <Navbar auth={auth} />
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/find" element={<FindTable auth={auth} />} />
            <Route path="/user/:username" element={<User auth={auth} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <footer>
          </footer>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
