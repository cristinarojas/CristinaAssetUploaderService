// To handle the environment mode from our JS
const isProduction = process.env.NODE_ENV === 'production';

export default !isProduction ? 'development' : 'production';
