describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB()
    cy.createUser({
      name: 'Meqdad Amr',
      username: 'ciri',
      password: 'dodo',
    })
  })
  describe.skip('Not Logged in', function () {
    beforeEach(function () {
      cy.visit('')
    })

    it('checking that the application displays the login form by default', function () {
      cy.contains('login')
      cy.contains('username')
      cy.contains('password')
      cy.contains('do')
    })

    it('login fails with wrong password', function () {
      cy.get('input[name="Username"]').type('ciri')
      cy.get('input[name="Password"]').type('wrong')
      cy.contains('do').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Meqdad Amr logged in')
    })

    it('front page can be opened', function () {
      cy.contains('Blog List')
      cy.contains('blogs')
    })

    it('login form can be toggled', function () {
      cy.contains('cancel').click()
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('ciri')
      cy.get('input[name="Password"]').type('dodo')
      cy.contains('do').click()
      cy.contains('Meqdad Amr logged in')
    })
  })

  describe('Logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ciri', password: 'dodo' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('test blog')
      cy.get('input[name="Author"]').type('test author')
      cy.get('input[name="Url"]').type('test url')
      cy.contains('create').click()
      cy.contains('test blog')
    })

    describe.skip('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog',
          author: 'test author',
          url: 'test url',
        })
        cy.visit('')
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1 likes')
      })

      it('it can be deleted', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'test blog')
      })

      it('only the creator can see the delete button of a blog, not anyone else', function () {
        cy.contains('logout').click()
        cy.createUser({
          name: 'Dodo',
          username: 'meqdad',
          password: 'dodo',
        })
        cy.login({ username: 'meqdad', password: 'dodo' })
        cy.contains('view').click()
        cy.get('.blog').should('not.contain', 'remove')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'The author with the second most likes',
          url: 'The url with the second most likes',
          likes: 50,
        })
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'The author with the most likes',
          url: 'The url with the most likes',
          likes: 100,
        })
        cy.visit('')
      })

      it('the blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).contains('The title with the most likes')
          cy.wrap(blogs[1]).contains('The title with the second most likes')
        })
      })
    })
  })
})
