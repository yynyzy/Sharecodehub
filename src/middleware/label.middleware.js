const LabelService = require("../service/label.service")

//在给动态添加标签之前，看是否创建过这些标签，如果没有则创建，有就放入到数组中，供下一个中间件使用
const vertifyLabelExists = async (ctx, next) => {
    const { labels } = ctx.request.body
    const newlabels = []
    for (const name of labels) {
        const LabelResult = await LabelService.getLabelByName(name)
        const label = { name }
        if (!LabelResult) {
            const result = await LabelService.create(name)
            label.id = result.insertId
        } else {
            label.id = LabelResult.id
        }
        newlabels.push(label)
    }
    ctx.labels = newlabels
    await next()
}

module.exports = {
    vertifyLabelExists
}