const path = require('path');
const projectConfig = require('./project.config.js');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const resolve = dir=> path.join(__dirname, './', dir);

process.env.VUE_APP_STORAGE_PREFIX = projectConfig.storagePrefix;

const genPlugins = () => {
    const list = [];

    list.push(new MonacoWebpackPlugin());
    return list;
};

module.exports = {
    configureWebpack: () => ({
        name: `${projectConfig.projectName}`,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@imgs': resolve('src/assets/imgs'),
                '@audios': resolve('src/assets/audios'),
                '@less': resolve('src/assets/less'),
                '@utils': resolve('src/utils'),
                '@styles': resolve('src/styles'),
                '@mixin': resolve('src/mixin'),
                '@c': resolve('src/components'),
                '@directive': resolve('src/directive'),
                '@plugins': resolve('src/plugins'),
            }
        },
        plugins: genPlugins()
    }),
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                './src/styles/less/*.less',
            ]
        },
        electronBuilder: {
            builderOptions: {
                productName: 'bearssh',
                appId: 'cn.codebear.bearssh'
            }
        }
    }
};
