const _ = require('lodash')



const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return {}
  const favBlog = blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
  }, blogs[0])
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  const blogCountByAuthor = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(
    _.keys(blogCountByAuthor),
    (author) => blogCountByAuthor[author]
  )
  return {
    author: topAuthor,
    blogs: blogCountByAuthor[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (!blogs.length) return {}
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorsWithLikes = _.map(groupedByAuthor, (blogs, author) => ({
    author: author,
    likes: _.sumBy(blogs, 'likes'),
  }))
  return _.maxBy(authorsWithLikes, 'likes')
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
