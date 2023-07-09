import { useState } from 'react'
import logingService from '../services/login'

const SignUpForm = ({ handleNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleUserNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await logingService
      .signUp({ username, name, password })
      .then((user) => {
        handleNotification(`Welcome ${user.name} you can now login!`, false)
        setUsername('')
        setName('')
        setPassword('')
      })
      .catch((error) => {
        handleNotification(error.response.data.error, true)
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: 'auto',
      }}
    >
      <h1>Sign Up</h1>

      <div>
        <input
          placeholder="Username"
          name="username"
          type="username"
          onChange={handleUserNameChange}
          value={username}
        />
      </div>

      <div>
        <input
          placeholder="Name"
          name="name"
          type="name"
          onChange={handleNameChange}
          value={name}
        />
      </div>

      <div>
        <input
          placeholder="Password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
          type="password"
        />
      </div>

      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  )
}

export default SignUpForm
