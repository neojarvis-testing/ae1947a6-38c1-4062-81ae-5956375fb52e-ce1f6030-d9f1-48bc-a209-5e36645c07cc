import React from 'react'
import GuideNavbar from './GuideComponents/GuideNavbar'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
<<<<<<< HEAD
import LogoutModel from './GuideComponents/LogoutModel'
import ErrorPage from './Components/ErrorPage'
=======
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace'
import TravellerNavbar from './TravellerComponents/TravellerNavbar'
>>>>>>> 49ea6be69f80927982f3e61575b14d04e3af8e25
const App = () => {
  return (
    <div>
        <GuideNavbar/>
        <HomePage/>
        <Login/>
        <Signup/>
<<<<<<< HEAD
        <LogoutModel/>
        <ErrorPage/>
=======
        <TravellerViewPlace/>
        <TravellerNavbar/>
>>>>>>> 49ea6be69f80927982f3e61575b14d04e3af8e25
    </div>
  )
}
export default App