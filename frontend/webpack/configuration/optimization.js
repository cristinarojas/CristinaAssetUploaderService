// A bundle for our node_modules which will be the biggest one, and one for our React application.
// to improve even more the performance and is by using the GZip compression - enabled with Nginx by modifying the /etc/nginx/nginx.conf
export default {
  splitChunks: {
    cacheGroups: {
      default: false,
      commons: {
        test: /node_modules/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  }
};
