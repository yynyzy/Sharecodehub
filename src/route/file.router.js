const Router = require('koa-router')
const Multer = require('koa-multer')

const vertifyAuth = require('../middleware/auth.middleware')

const fileRouter = new Router({ prefix: '/upload' })
const avatarUpload = Multer({
    dest: './uploads/avatar'
})
const avatarHandler = avatarUpload.single('avatar')

fileRouter.post('/avatar ', vertifyAuth, avatarHandler)

module.exports = fileRouter