const { makeExecutableSchema } = require('graphql-tools');

const { 
  types: mongoTypes,
  queries: mongoQueries,
  mutations: mongoMutations,
  resolvers: mongoResolvers
} = require('./mongooseSchema');

//
// SAMPLE-DATA folder
//
const { 
  types: dataTypes, 
  queries: dataQueries,
  mutations: dataMutations,
  resolvers: dataResolvers
} = require('../../sample-data/Schema');

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
// extract query and mutation
const { Query: mQuery, Mutation: mMutation, ...mRest } = mongoResolvers;
const { Query: dQuery, Mutation: dMutation, ...dRest } = dataResolvers;
// merge all
const resolvers = {
  ...mRest,
  ...dRest,
  Query: {
    ...mQuery,
    ...dQuery
  },
  Mutation: {
    ...mMutation,
    ...dMutation
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
  
module.exports = schema;

