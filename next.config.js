module.exports = {
  images: {
    domains: ['cdn.chec.io'],
  },
  use: {
    loader: 'file-loader',
    options: {
      outputPath: 'static/fonts/FuturaPTBook.woff2/',
      publicPath: '/_next/static/fonts/FuturaPTBook.woff2/',
      outputPath: 'static/fonts/FuturaPTMedium.woff2/',
      publicPath: '/_next/static/fonts/FuturaPTMedium.woff2/',

      limit: 1,
    },
  },
}
