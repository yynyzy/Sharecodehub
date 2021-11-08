/**
 *   用于标签的相关路由
 */
const Router = require('koa-router')

const { vertifyAuth } = require('../middleware/auth.middleware')
const { create } = require('../controller/label.controller')

const labelRouter = new Router({ prefix: '/label' })
labelRouter.post('/', vertifyAuth, create)


module.exports = labelRouter