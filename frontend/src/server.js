// Dependencies
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import cors from 'cors'

// Webpack Configuration
import webpackConfig from '../webpack.config.babel.js'

// Client Render
import clientRender from './render/clientRender.js'

// Environment
const isProduction = process.env.NODE_ENV === 'production'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Express Application
const app = express()

// Webpack Compiler
const compiler = webpack(webpackConfig)

// Webpack Middleware
if (!isProduction) {
  // Hot Module Replacement
  app.use(webpackDevMiddleware(compiler))
  app.use(webpackHotMiddleware(compiler))
} else {
  // GZip Compression just for Production
  app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`
    res.set('Content-Encoding', 'gzip')
    next()
  })
}

app.use(cors())

// Public directory
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))
app.use(express.static(path.join(__dirname, '../public')))

// Client Side Rendering
app.use(clientRender())

// Disabling x-powered-by
app.disable('x-powered-by')

// Listen Port 3000...
app.listen(3000)
