import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleSubmit={mockHandler} />)

  const inputs = screen.getAllByRole('textbox')
  const submitButton = screen.getByText('create')

  for (let input of inputs) {
    await user.type(input, `testing a form... ${input.name}`)
  }
  await user.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(`testing a form... ${inputs[0].name}`)
  expect(mockHandler.mock.calls[0][0].author).toBe(`testing a form... ${inputs[1].name}`)
  expect(mockHandler.mock.calls[0][0].url).toBe(`testing a form... ${inputs[2].name}`)

})
