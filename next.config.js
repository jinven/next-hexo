const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withSass = require('@zeit/next-sass')

module.exports = (phase, { defaultConfig }) => {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })
    const nextConfig = {
        crossOrigin: 'anonymous',
        cssModules: true,
        env: {
            customKey: phase + ' next.config.js - customKey',
        },
        // publicRuntimeConfig: {
        //   // Will be available on both server and client
        //   staticFolder: '/static',
        // },
        target: 'serverless',
        // serverRuntimeConfig: {
        //     // Will only be available on the server side
        //     mySecret: 'secret',
        //     secondSecret: process.env.SECOND_SECRET, // Pass through env variables
        // },
        // https://nextjs.org/docs#disabling-file-system-routing
        useFileSystemPublicRoutes: true,
        // response x-powered-by
        // build 目录，默认 .next
        // distDir: 'build',
        // generateEtags: false,
        // generateBuildId: async () => {
        //     // For example get the latest git commit hash here
        //     return 'my-build-id'
        // },
        onDemandEntries: {
            // period (in ms) where the server will keep pages in the buffer
            maxInactiveAge: 25 * 1000,
            // number of pages that should be kept simultaneously without being disposed
            pagesBufferLength: 2,
        },
        // pageExtensions: ['mdx', 'jsx', 'js'],
        exportPathMap: function() {
            return {
                '/dynamic': { page: '/dynamic', query: { showMore: false } },
                '/contact': { page: '/contact' },
            }
        },
    }
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        // 开发环境
        nextConfig.distDir = '.next-dev'
        // gzip
        nextConfig.compress = false
    } else {
        // 生产环境
        nextConfig.poweredByHeader = false
        nextConfig.generateEtags = false
        nextConfig.assetPrefix = 'http://127.0.0.1:3000'
    }
    // To fall back to the default
    // return null
    return withBundleAnalyzer(withSass(nextConfig))
}
