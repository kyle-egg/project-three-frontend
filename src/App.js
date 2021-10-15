import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import NavBar from './components/common/Navbar.js'
import Home from './components/common/Home.js'
import Movies from './components/Movies.js'
import Register from './components/common/Register.js'
import Login from './components/common/Login.js'
import Marathon from './components/Marathon.js'
import MarathonProfile from './components/MarathonProfile.js'
import MovieProfile from './components/MovieProfile.js'
// import Lists from './components/lib/Lists.js'
// import RecentlyAdded from './components/lib/RecentlyAdded.js'
import MarathonGenerator from './components/MarathonGenerator.js'
import UserProfile from './components/UserProfile.js'
import Splash from './components/common/Splash.js'
import AllMarathons from './components/AllMarathons.js'

function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies/:movieId">
          <MovieProfile />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/marathongenerator">
          <MarathonGenerator />
        </Route>
        <Route path="/marathons/:marathonId">
          <MarathonProfile />
        </Route>
        <Route path="/marathon">
          <Marathon />
        </Route>
        <Route path="/user/:userId">
          <UserProfile />
        </Route>
        <Route path="/register">
          <Register />
         
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/splash">
          <Splash />
        </Route>
        <Route path="/marathons">
          <AllMarathons />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App