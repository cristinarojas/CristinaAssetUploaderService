//  Importing plugins
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
//BundleAnalyzer (webpack-bundle-analyzer) plugin can help us to see all the packages sizes;
import WebpackNotifierPlugin from 'webpack-notifier'
import CompressionPlugin from 'compression-webpack-plugin'

// Save if is production mode
const isProduction = process.env.NODE_ENV === 'production'

// Minify html
const plugins = []

// If is production then minify css
if (isProduction) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /.js$/
    })
  )
} else {
  // BundleAnalyzerPlugin will be executed only on development mode (npm start)
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({
      title: 'Uploader'
    })
  )
}

export default plugins
