const Router = require('koa-router')

const { vertifyAuth } = require("../middleware/auth.middleware")
const { create, reply, update } = require("../controller/comment.controller")

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', vertifyAuth, create)
commentRouter.post('/:commentId/reply', vertifyAuth, reply)
commentRouter.post('/:commentId', vertifyAuth, update)

module.exports = commentRouter