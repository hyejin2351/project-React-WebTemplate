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
const resolvers = {
  ...mongoResolvers,
  ...dataResolvers,
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

