/**
 *   上传图片相关路由
 */
const Router = require('koa-router')

const { vertifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware')
const { saveavatarInfo, savepictureInfo } = require('../controller/file.controller')
const { getAvatarInfo } = require('../controller/user.controller')


const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', vertifyAuth, avatarHandler, saveavatarInfo)
fileRouter.get('/:userId/avatar', getAvatarInfo)
fileRouter.post('/picture', vertifyAuth, pictureHandler, pictureResize, savepictureInfo)

module.exports = fileRouter