const Blog = require('../models/blog')
const Comment = require('../models/comment')
const {
  throwMyCustomError,
  userExtractor,
} = require('../utils/middleware')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { blogs: 0 })
    .populate('comments')
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  // ? how to make it right or what is the best practice
  const _id = request.params.id
  /*  const blog = await Blog.findById(_id)
  const user = request.user

  if (blog.user.toString() !== user.id.toString()) {
    throwMyCustomError(
      'UnauthorizedError',
      'Unauthorized to edit; not the owner'
    )
  }*/

  const updatedFields = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(_id, updatedFields, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  response.json(updatedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  // ? how to make it right or what is the best practice
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() !== user.id.toString()) {
    throwMyCustomError(
      'UnauthorizedError',
      'Unauthorized to delete; not the owner'
    )
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString())

  await user.save()
  await blog.deleteOne()

  response.status(204).end()
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { author, url, title, likes } = request.body
  const user = request.user
  const blog = new Blog({
    author,
    url,
    title,
    likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({
    content,
  })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()

  response.status(201).json(savedComment)
})

blogRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('comments')
  response.json(blog.comments)
})

module.exports = blogRouter
