/**
 * Created by jcdev00 on 18. 10. 12.
 */
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const customdate = new GraphQLScalarType({
    // http://dev.apollodata.com/tools/graphql-tools/scalars.html#Date-as-a-scalar
    name: 'Date',
    description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
    parseValue(value) {
        // Turn an input into a date which we want as a number
        // value from the client
        return new Date(value).valueOf();
    },
    serialize(value) {
        // Convert Date to number primitive .getTime() or .valueOf()
        // value sent to the client
        if (value instanceof Date) return value.valueOf();
        return value;
    },
    parseLiteral(ast) {
        // ast value is always in string format
        if (ast.kind === Kind.INT) {
            // parseInt turns a string number into number of a certain base
            return parseInt(ast.value, 10);
        }
        return null;
    },
})

module.exports = customdate;
