const { makeExecutableSchema } = require('graphql-tools');

const { 
  types: mongoTypes,
  queries: mongoQueries,
  mutations: mongoMutations,
  resolvers: mongoResolvers
} = require('./mongooseSchema');

const { 
  types: dataTypes, 
  queries: dataQueries,
  mutations: dataMutations,
  resolvers: dataResolvers
} = require('../../data/Schema');

const typeDefs = `
    ${mongoTypes}
    ${dataTypes}
    type Query {
        ${mongoQueries}
        ${dataQueries}
    }
    type Mutation {
        ${mongoMutations}
        ${dataMutations}        
    }
`;
/* console.log('====================================================');
console.log(typeDefs);
console.log('----------------------------------------------------');
 */
const resolvers = {
  Query: {
    ...mongoResolvers.Query,
    ...dataResolvers.Query
  },

  Mutation: {
    ...mongoResolvers.Mutation,
    ...dataResolvers.Mutation
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
  
module.exports = schema;



const tmp = `
  # User type for response
  type User {
    _id: String
    id: String
    email: String
    name: String
  }

  # User type for input, such as creating or updating
  input UserData {
    email: String
    name: String
  }



  type Comment {
    id: Int!

    creationTime: Date!

    comments: [Comment]!

    # The ID of the item to which the comment was made on
    parent: Int!

    # The ID of the user who submitted the comment
    submitterId: String!

    text: String

    # Whether the currently logged in user has upvoted the comment
    upvoted: Boolean!

    # The User who submitted the comment
    author: User
  }

  scalar Date

  # A list of options for the sort order of the feed
  enum FeedType {
    # Sort by a combination of freshness and score, using an algorithm (Could use Reddit's)
    TOP

    # Newest entries first
    NEW

    # Sort by score
    BEST

    # SHOW HN articles
    SHOW

    # ASK HN articles
    ASK

    # Job listings
    JOB
  }

  type NewsItem {

    id: Int!

    comments: [Comment]!

    commentCount: Int!

    creationTime: Date!

    # List of user ids who have hidden this post
    hides: [String]!

    # Whether the currently logged in user has hidden the post
    hidden: Boolean!

    # The ID of the news item submitter
    submitterId: String!

    # The news item headline
    title: String!

    text: String

    # Whether the currently logged in user has upvoted the post
    upvoted: Boolean!

    upvotes: [String]!

    upvoteCount: Int!

    url: String

    # Fetches the author based on submitterId
    author: HNUser
  }

  type HNUser {
    # The user ID is a string of the username
    id: String!

    about: String

    creationTime: Date!

    dateOfBirth: Date

    email: String

    favorites: [Int]

    firstName: String

    hides: [Int]!

    karma: Int!

    lastName: String

    likes: [Int]!

    posts: [Int]!
  }

    type Query {

    getUsers
    : [User]

    getUser(
        id: String!
    ): User


    # A comment, it's parent could be another comment or a news item.
    comment(id: Int!): Comment

    feed(
      # The sort order for the feed
      type: FeedType!,

      # The number of items to fetch (starting from the skip index), for pagination
      first: Int

      # The number of items to skip, for pagination
      skip: Int,
    ): [NewsItem]

    # The currently logged in user or null if not logged in
    me: User

    # A news item
    newsItem(id: Int!): NewsItem

    # A user
    user(id: String!): HNUser

    }
    type Mutation {

    createUser (
      email: String!
      name: String
    ): User

    deleteUser (
      id: String!
    ): User

    updateUser (
      id: String!
      userData: UserData
    ): User


    upvoteNewsItem (
      id: Int!
    ): NewsItem

    hideNewsItem (
      id: Int!
    ): NewsItem

    submitNewsItem (
      title: String!
      url: String
      text: String
    ): NewsItem

    }
`