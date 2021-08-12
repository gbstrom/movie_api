const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  CONNECTION_URI: process.env.CONNECTION_URI || 'mongodb://localhost:27017/myFlixDB'
}
module.exports = config;
