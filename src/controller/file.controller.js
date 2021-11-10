const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_PORT, APP_HOST } = require('../app/config')

class FileController {
    //上传头像
    async saveavatarInfo(ctx, next) {
        //获取图片相关信息
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user

        //将图片信息保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id)

        //将图片地址保存到user表中
        const avatar_url = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
        await userService.updataAvatarUrlById(avatar_url, id)
        ctx.body = "图片上传成功"
    }
    // 上传图片
    async savepictureInfo(ctx, next) {
        const files = ctx.req.files
        const { momentId } = ctx.query
        const { id } = ctx.user
        console.log(files);
        for (const file of files) {
            const { filename, mimetype, size } = file
            await fileService.createPicture(filename, mimetype, size, momentId, id)
        }
        console.log(1);
        ctx.body = "图片上传成功"
    }


}

module.exports = new FileController();