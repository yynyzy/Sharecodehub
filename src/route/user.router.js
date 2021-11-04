const Router = require('koa-router')

const { create } = require("../controller/user.controller")
const { vertifyUser, passwordHandle } = require("../middleware/user.middleware")


const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', vertifyUser, passwordHandle, create)

module.exports = userRouter