// This is for minify the css in production.
// This process reduces the size of your assets and dramatically improves your website's load time.
//  A bundle for our node_modules which will be the biggest one, and one for our React application.
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

const rules = [
  {
    test: /.(js|jsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  }
]

if (isProduction) {
  rules.push({
    test: /.(scss|css)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }
      },
      'sass-loader'
    ]
  })
} else {
  rules.push({
    test: /.(scss|css)$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  })
}

export default {
  rules
}
