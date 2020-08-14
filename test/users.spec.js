const chai = require('chai')
const http = require('chai-http')
const subSet = require('chai-subset')

const user = require('../routes/users-routes')

chai.use(http)
chai.use(subSet)

describe('Create user', () => {

  it('createUser', () => {

  })
})
