import React from 'react'
import GuideNavbar from './GuideComponents/GuideNavbar'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import LogoutModel from './GuideComponents/LogoutModel'
import ErrorPage from './Components/ErrorPage'
const App = () => {
  return (
    <div>
        <GuideNavbar/>
        <HomePage/>
        <Login/>
        <Signup/>
        <LogoutModel/>
        <ErrorPage/>
    </div>
  )
}

export default App