
/*
  Models are like data controllers
  They interact with the Cache and DB
*/

// GraphQL supports promises so models can return them


module.exports = {
  Feed: require('./models/Feed').default,
  NewsItem: require('./models/NewsItem').default,
  User: require('./models/User').default,
  Comment: require('./models/Comment').default,
};
