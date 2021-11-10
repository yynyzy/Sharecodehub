//处理路由功能
const fs = require('fs');

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
    async create(ctx, next) {
        const user = ctx.request.body
        const result = await userService.create(user);
        ctx.body = result
    }

    async getAvatarInfo(ctx, next) {
        //确定哪个用户的头像
        const { userId } = ctx.params
        const avatarInfo = await fileService.getAvatarInfo(userId)
        //提供图像信息
        ctx.response.set('Content-Type', avatarInfo.mimetype)
        console.log(fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`))
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new UserController()