// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue:16,
            propList: ['*'],
        },
    },
};