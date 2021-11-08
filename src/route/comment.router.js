const Router = require('koa-router')

const { vertifyAuth, vertifyPermission } = require("../middleware/auth.middleware")
const { create, reply, update, remove, list } = require("../controller/comment.controller")

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', vertifyAuth, create)
commentRouter.post('/:commentId/reply', vertifyAuth, reply)
commentRouter.post('/:commentId', vertifyAuth, vertifyPermission, update)
commentRouter.delete('/:commentId', vertifyAuth, vertifyPermission, remove)
//获取一篇文章的用户的所有回复的列表
commentRouter.get('/', list)

module.exports = commentRouter