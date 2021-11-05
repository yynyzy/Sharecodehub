const Router = require('koa-router')

const { login, success } = require("../controller/auth.controller")
const { verifyLogin, vertifyAuth } = require("../middleware/auth.middleware")

const authRouter = new Router()


authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', vertifyAuth, success)

module.exports = authRouter