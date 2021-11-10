const fileService = require('../service/file.service')

class FileController {
    async saveavatarInfo(ctx, next) {
        //获取图片相关信息
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user

        //将图片信息保存到数据库中
        const result = await fileService.createAvatar(filename, mimetype, size, id)
        ctx.body = result
    }


}

module.exports = new FileController();