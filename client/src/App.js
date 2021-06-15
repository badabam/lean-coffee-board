import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import loadFromLocal from './lib/loadFromLocal'
import saveToLocal from './lib/saveToLocal'
import postUser from './services/postUser'
import Board from './components/Board'
import Login from './components/Login'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(loadFromLocal('user'))
  const [error, setError] = useState(null)
  const isLoggedOut = !user

  const history = useHistory()

  useEffect(() => {
    saveToLocal('user', user)
  }, [user])

  return (
    error || (
      <Grid loggedOut={isLoggedOut}>
        {isLoggedOut ? <Redirect to="/" /> : <Redirect to="/board" />}
        <Switch>
          <Route exact path="/">
            <Login onSubmit={createUser} />
          </Route>
          <Route path="/board">
            <Board user={user} onLogout={handleLogout} />
          </Route>
        </Switch>
      </Grid>
    )
  )

  function createUser(name) {
    postUser(name).then(setUser).catch(setError)
  }

  function handleLogout() {
    setUser(null)
    history.push('/')
  }
}

const Grid = styled.div`
  display: grid;
  ${props => props.loggedOut && 'place-items: center'};
  height: 100vh;
`

export default App
