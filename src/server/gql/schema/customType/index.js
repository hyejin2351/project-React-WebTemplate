/**
 * Created by jcdev00 on 18. 10. 16.
 */

const { GraphQLUpload } = require('graphql-upload');

const customTypeDefs =
    `
    scalar Date
    scalar Upload
`;

const customResolvers = {
    Date: require('./Date'),
    Upload: GraphQLUpload
};

module.exports = {
    customTypeDefs, customResolvers
}