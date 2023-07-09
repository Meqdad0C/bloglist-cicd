import Blog from './Blog.jsx'
import blogService from '../services/blogs'

const DisplayBlogs = ({ blogs, setBlogs, handleNotification }) => {
  const doLike = async (blog) => {
    try {
      const response = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      })
      response.user = blog.user

      setBlogs((blogs) =>
        blogs.map((blog) => (blog.id !== response.id ? blog : response))
      )
    } catch (error) {
      handleNotification(`Error liking blog!: ${error.message}`, true)
    }
  }
  const doRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
    } catch (error) {
      handleNotification(`Error removing blog!: ${error.message}`, true)
    }
  }
  const handlers = { doLike, doRemove }

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes || a.title.localeCompare(b.title))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} handlers={handlers} />
        ))}
    </div>
  )
}

export default DisplayBlogs
