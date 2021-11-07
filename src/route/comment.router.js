const Router = require('koa-router')

const { vertifyAuth, vertifyPermission } = require("../middleware/auth.middleware")
const { create, reply, update, remove } = require("../controller/comment.controller")

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', vertifyAuth, create)
commentRouter.post('/:commentId/reply', vertifyAuth, reply)
commentRouter.post('/:commentId', vertifyAuth, vertifyPermission, update)
commentRouter.delete('/:commentId', vertifyAuth, vertifyPermission, remove)

module.exports = commentRouter