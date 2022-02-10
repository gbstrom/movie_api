const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  //CONNECTION_URI: process.env.CONNECTION_URI || 'mongodb://localhost:27017/myFlixDB',
  CONNECTION_URI: 'mongodb+srv://gbstrom:MongoDBWhe!st0ne@gbsdb.9g6xt.mongodb.net/myFlixDB?retryWrites=true&w=majority'
}
module.exports = config;
