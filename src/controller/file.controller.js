class FileController {
    async saveavatarInfo(ctx, next) {
        //获取图片相关信息
        console.log(ctx.req.file);
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user
        const result = await fileService.createAvatar(filename, mimetype, size, id)
        ctx.body = result
    }
}

module.exports = new FileController();