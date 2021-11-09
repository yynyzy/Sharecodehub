const Router = require('koa-router')

const { vertifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler } = require('../middleware/file.middleware')



const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar ', vertifyAuth, avatarHandler)

module.exports = fileRouter