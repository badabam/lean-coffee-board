import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getRandomName from '../services/getRandomName'
import Button from './Button'

export default function Login({ onSubmit }) {
  const [randomName, setRandomName] = useState('')

  useEffect(() => {
    getRandomName()
      .then(setRandomName)
      .catch(() => {})
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Choose a name:
        <input name="name" placeholder={randomName} />
      </label>
      <label>
        Your email:
        <input
          name="email"
          type="email"
          placeholder={`${randomName}@coffee.de`}
        />
      </label>
      <label>
        A password:
        <input name="password" type="password" placeholder="..." />
      </label>

      <Button>Let's go!</Button>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { name, email, password } = form.elements
    onSubmit({
      password: password.value,
      username: name.value,
      email: email.value,
    })
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
