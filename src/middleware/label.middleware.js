const LabelService = require("../service/label.service")
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
    console.log(newlabels);
    ctx.labels = newlabels

    await next()
}

module.exports = {
    vertifyLabelExists
}