const Router = require('koa-router')

const { create } = require("../controller/user.controller")
const { Vertify, passwordHandle } = require("../middleware/user.middleware")


const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', Vertify, passwordHandle, create)

module.exports = userRouter