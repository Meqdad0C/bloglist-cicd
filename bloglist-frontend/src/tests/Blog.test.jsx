/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog.jsx'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://localhost:3000',
    likes: 0,
    id: '649931bd26441a326295a084',
    user: {
      id: '64979cafc3c2825be9fb32fd',
      username: 'ciri',
      name: 'Ciri',
    },
  }

  test('renders title', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('renders title and author but not url and like', () => {
    const { container } = render(<Blog blog={blog} />)
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(blogDiv).toHaveTextContent('Test Author')

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('renders url and likes when view button is clicked', async () => {
    const { container } = render(<Blog blog={blog} />)
    const button = screen.getByText('view')
    await userEvent.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const mockHandler = { doLike: jest.fn(), doRemove: jest.fn() }
    render(<Blog blog={blog} handlers={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.doLike.mock.calls).toHaveLength(2)
  })
})
