const { makeExecutableSchema } = require('graphql-tools');

// users
const { 
  types: usersTypes,
  queries: usersQueries,
  mutations: usersMutations,
  resolvers: usersResolvers
} = require('../../users/gql/schema');

// articles
const {
    types: articlesTypes,
    queries: articlesQueries,
    mutations: articlesMutations,
    resolvers: articlesResolvers
} = require('../../mods/articles/gql/schema');

//
// SAMPLE-DATA folder
//
const { 
  types: sampleTypes, 
  queries: sampleQueries,
  mutations: sampleMutations,
  resolvers: sampleResolvers
} = require('../../mods/sample/gql/schema');

let typeDefs = `
    ${usersTypes}
    ${articlesTypes}
    ${sampleTypes}

    type Query {
        ${usersQueries}
        ${articlesQueries}
        ${sampleQueries}

    }
    type Mutation {
        ${usersMutations}
        ${articlesMutations}  
        ${sampleMutations}  

    }
`;
/* console.log('====================================================');
console.log(typeDefs);
console.log('----------------------------------------------------');
 */
// extract query and mutation
const { 
  Query: usersQuery,
  Mutation: usersMutation,
  ...usersRest
} = usersResolvers;

const {
    Query: articlesQuery,
    Mutation: articlesMutation,
    ...articlesRest
} = articlesResolvers;

const { 
  Query: sampleQuery,
  Mutation: sampleMutation,
  ...sampleRest
} = sampleResolvers;

// merge all
let resolvers = {
  ...usersRest,
  ...articlesRest,
  ...sampleRest,

  Query: {
    ...usersQuery,
    ...articlesQuery,
    ...sampleQuery

  },
  Mutation: {
    ...usersMutation,
    ...articlesMutation,
    ...sampleMutation
    
  },
};

//customType
const { customTypeDefs, customResolvers } = require('./customType');
typeDefs = typeDefs.concat(customTypeDefs)
resolvers = {...resolvers, ...customResolvers}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
  
module.exports = schema;

