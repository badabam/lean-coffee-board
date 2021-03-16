import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import postUser from '../services/postUser'
import Board from './Board'
import Button from './Button'
import Register from './Register'
import Login from './Login'
import loginUser from '../services/loginUser'

function App() {
  const [user, setUser] = useState(loadFromLocal({}))
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    saveToLocal('user', user)
  }, [user])

  return (
    error || (
      <Grid loggedOut={!user}>
        {user ? (
          <Board user={user} onLogout={() => setUser(null)} />
        ) : (
          <>
            {registered ? (
              <Login onLogin={handleLoginUser} />
            ) : (
              <Register onRegister={createUser} />
            )}
            <LogInButton
              type="button"
              onClick={() => setRegistered(!registered)}
            >
              <small>
                {registered
                  ? "You don't have a user? Register here!"
                  : 'Allready registered? Click here to log in!'}
              </small>
            </LogInButton>
          </>
        )}
      </Grid>
    )
  )

  function handleLoginUser(user) {
    const authenticationObject = {
      identifier: user.email,
      password: user.password,
    }

    loginUser(authenticationObject)
      .then(data =>
        setUser({
          username: data.user.username,
          token: data.jwt,
          id: data.user.id,
        })
      )
      .catch(error => console.log('error....-----', error.message))
  }

  function createUser(user) {
    postUser(user)
      .then(data =>
        setUser({
          username: data.user.username,
          token: data.jwt,
          id: data.user.id,
        })
      )
      .catch(error => console.log('error....-----', error.message))
  }
}

const Grid = styled.div`
  display: grid;
  ${props => props.loggedOut && 'place-items: center'};
  height: 100vh;
`

const LogInButton = styled(Button)`
  background: white;
  color: plum;
  border: 1px dashed plum;
  max-width: 360px;

  &:hover {
    background: plum;
    color: white;
    border: none;
  }
`

export default App
