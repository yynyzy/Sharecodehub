const Router = require('koa-router')

const { create } = require("../controller/user.controller")
const vertify = require("../middleware/user.middleware")

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', vertify, create)

module.exports = userRouter