import '@babel/register'

import {
  devtool,
  entry,
  mode,
  module,
  optimization,
  output,
  plugins,
  resolve
} from './webpack/configuration/index.js'

const webpackConfig = {
  devtool,
  entry,
  mode,
  module,
  optimization,
  output,
  plugins,
  resolve
}

export default webpackConfig
