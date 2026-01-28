const webpackConfig = require('@nextcloud/webpack-vue-config')
const path = require('path')

webpackConfig.entry = {
    main: path.join(__dirname, 'src', 'main.js'),
}

module.exports = webpackConfig
