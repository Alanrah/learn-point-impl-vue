const path = require("path");

module.exports = {
    lintOnSave: false,
    productionSourceMap: true,

    chainWebpack: config => {
        config.resolve.alias.set("@", path.resolve(__dirname, "src"));
    },

    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "stylus"
        }
    },

    devServer: {
        disableHostCheck: true
    }
};
