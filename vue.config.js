const {defineConfig} = require('@vue/cli-service')
const fs = require('fs')
const path = require('path')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        https: {
            key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem')),
        },
        port: 3000,
        host: '0.0.0.0',
    }
})
