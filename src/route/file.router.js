/**
 *   上传图片相关路由
 */
const Router = require('koa-router')

const { vertifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler } = require('../middleware/file.middleware')
const { saveavatarInfo } = require('../controller/file.controller')


const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', vertifyAuth, avatarHandler, saveavatarInfo)

module.exports = fileRouter