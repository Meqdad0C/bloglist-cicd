import { useState } from 'react'

const Blog = ({ blog, handlers }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = (event) => {
    event.preventDefault()
    handlers.doLike(blog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handlers.doRemove(blog)
    }
  }

  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogAppUser')
  )

  return (
    <div style={blogStyle} className="blog">
      <div>
        <div>
          {blog.title} - {blog.author}
        </div>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={{ display: visible ? '' : 'none' }} className='togglableContent'>
        <div>{' '}{blog.url}</div>
        <div>
          {' '}
          {blog.likes} likes <button onClick={handleLike}>like</button>{' '}
        </div>
        <div> added by: {blog.user.name} </div>
        <div>
          {currentUser && blog.user.username === currentUser.username ? (
            <button onClick={handleRemove}>remove</button>
          ) : (
            ''
          )}{' '}
        </div>
      </div>
    </div>
  )
}

export default Blog
