import React from 'react'
import GuideNavbar from './GuideComponents/GuideNavbar'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
const App = () => {
  return (
    <div>
        <GuideNavbar/>
        <HomePage/>
        <Login/>
        <Signup/>
    </div>
  )
}

export default App