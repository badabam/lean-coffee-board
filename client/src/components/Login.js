import { useState } from 'react'
import styled from 'styled-components/macro'
import validateUser from '../services/validation'
import Button from './Button'

export default function Register({ onLogin }) {
  const [error, setError] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          onChange={handleChange}
          value={user.email}
          name="email"
          type="email"
          placeholder="jon@doe.com"
        />
      </label>
      <label>
        A password:
        <input
          onChange={handleChange}
          value={user.password}
          name="password"
          type="password"
          placeholder="..."
        />
      </label>
      {error && <small>Please fill out the form correctly</small>}
      <Button>Let's go!</Button>
    </Form>
  )

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    setUser({ ...user, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (validateUser(user)) {
      onLogin(user)
    } else {
      setError(true)
    }
  }
}

const Form = styled.form`
  display: grid;
  gap: 20px;
  padding: 40px;
  border-radius: 12px;
  border: 2px dashed plum;
  box-shadow: 0 4px 8px #0003;
  max-width: 360px;
  width: 100%;

  label {
    display: grid;
    gap: 10px;
  }

  input {
    width: 100%;
  }
`
