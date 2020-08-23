// Dependencies
import path from 'path';

// This will be the path for the output webpack files (bundles)
export default {
  filename: '[name].js',
  path: path.resolve(__dirname, '../../public/app'),
  publicPath: '/'
};
