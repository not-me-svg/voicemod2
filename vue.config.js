//vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Free Real Time Voice Changer & Modulator - Voicemod";
                return args;
            })
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/hello-world/'
    : '/'
}