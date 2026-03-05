const webpackConfig = require('@nextcloud/webpack-vue-config')
const path = require('path')

webpackConfig.entry = {
    main: path.join(__dirname, 'src', 'main.js'),
}

// Short hash-based chunk filenames to avoid long filenames with special
// characters that some hosting providers cannot serve correctly
webpackConfig.output.chunkFilename = 'worktime-[contenthash].js'

module.exports = webpackConfig
