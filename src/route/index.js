/**
 *  用于统一管理 router 的注册引用。
 */
const fs = require('fs');

const useRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === "index.js") return;
        const _router = require(`./${file}`)
        app.use(_router.routes())
        app.use(_router.allowedMethods())
    })

}
module.exports = useRoutes
