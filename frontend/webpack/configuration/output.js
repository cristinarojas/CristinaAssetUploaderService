// Dependencies
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// This will be the path for the output webpack files (bundles)
export default {
  filename: '[name].js',
  path: path.resolve(__dirname, '../../public/app'),
  publicPath: '/'
}
