import React from 'react'
import GuideNavbar from './GuideComponents/GuideNavbar'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace'
import TravellerNavbar from './TravellerComponents/TravellerNavbar'
import PlaceForm from './GuideComponents/PlaceForm'
import ErrorPage from './Components/ErrorPage'
const App = () => {
  return (
    <div>
        <GuideNavbar/>
        <HomePage/>
        <Login/>
        <Signup/>
        <ViewPlace/>
        <TravellerViewPlace/>
        <TravellerNavbar/>
        <PlaceForm/>
        <ErrorPage/>
    </div>
  )
}
export default App