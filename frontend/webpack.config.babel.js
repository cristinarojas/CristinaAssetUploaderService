require('@babel/register');

import {
  devtool,
  entry,
  mode,
  module,
  optimization,
  output,
  plugins,
  resolve
} from './webpack/configuration';

const webpackConfig = {
  devtool,
  entry,
  mode,
  module,
  optimization,
  output,
  plugins,
  resolve
};

export default webpackConfig;
