import React from 'react'
import GuideNavbar from './GuideComponents/GuideNavbar'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace'
import TravellerNavbar from './TravellerComponents/TravellerNavbar'
const App = () => {
  return (
    <div>
        <GuideNavbar/>
        <HomePage/>
        <Login/>
        <Signup/>
        <TravellerViewPlace/>
        <TravellerNavbar/>
    </div>
  )
}
export default App