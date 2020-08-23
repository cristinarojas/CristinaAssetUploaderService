//  Split bundles (vendors and application bundles), add source maps, and implement the BundleAnalyzerPlugin.
const isProduction = process.env.NODE_ENV === 'production';

// Showing sourcemap in development and hidde sourcemap in production.
export default !isProduction ? 'cheap-module-source-map' : '';
