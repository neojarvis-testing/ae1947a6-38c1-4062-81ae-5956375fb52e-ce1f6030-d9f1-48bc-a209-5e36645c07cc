import React from 'react'
import ErrorPage from './Components/ErrorPage'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
const App = () => {
  return (
    <div>
        <ErrorPage/>
        <HomePage/>
        <Login/>
        <Signup/>

    </div>
  )
}

export default App