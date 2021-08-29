module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://cloud-music-liard.vercel.app',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}