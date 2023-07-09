const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'Sarah',
    likes: 532,
    title: 'The Nightingale',
    url: 'SarahBooks.com',
    user: '649781348c8837922c2464ed',
  },
  {
    author: 'John',
    likes: 789,
    title: 'The Alchemist',
    url: 'JohnReads.com',
    user: '649781348c8837922c2464ed',
  },
  {
    author: 'Emily',
    likes: 245,
    title: 'Pride and Prejudice',
    url: 'EmilyWrites.com',
    user: '649781348c8837922c2464ed',
  },
  {
    author: 'Alex',
    likes: 623,
    title: 'The Great Gatsby',
    url: 'AlexReads.com',
    user: '64979cafc3c2825be9fb32fd',
  },
  {
    author: 'Sophia',
    likes: 421,
    title: 'To Kill a Mockingbird',
    url: 'SophiaBooks.com',
    user: '64979cafc3c2825be9fb32fd',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    author: 'willremovethissoon',
    title: 'willremovethissoon',
    url: 'willremovethissoon',
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  usersInDB,
}
