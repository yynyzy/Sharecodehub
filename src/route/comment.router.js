const Router = require('koa-router')

const { vertifyAuth } = require("../middleware/auth.middleware")
const { create } = require("../controller/comment.controller")

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', vertifyAuth, create)

module.exports = commentRouter