/**
 *   上传图片相关路由
 */
const Router = require('koa-router')

const { vertifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler } = require('../middleware/file.middleware')
const { saveavatarInfo } = require('../controller/file.controller')
const { getAvatarInfo } = require('../controller/user.controller')


const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', vertifyAuth, avatarHandler, saveavatarInfo)
fileRouter.get('/:userId/avatar', getAvatarInfo)

module.exports = fileRouter