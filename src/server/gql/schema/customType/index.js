/**
 * Created by jcdev00 on 18. 10. 16.
 */


const customTypeDefs =
    `
    scalar Date
`;

const customResolvers = {
    Date: require('./Date')
};

module.exports = {
    customTypeDefs, customResolvers
}