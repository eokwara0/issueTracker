/* eslint-disable linebreak-style */
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');


/**
 * @Defining GrapQL Schema for our GraphQLScalar Type ( GraphQLDate )
 */
const GraphQLDate = new GraphQLScalarType({

  // Scalar definition
  // Scalar description

  name: 'GraphQLDate',
  description: 'A Data() type in GraphQL as a scalar',

  /**
     *
     * @param {Incoming issue value } value
     * @returns  Date object if the values is a valid data string else returns undefined
     */

  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
  },


  // processes Incoming value
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value);
      return Number.isNaN(value.getTime()) ? undefined : value;
    }
    return undefined;
  },

  // serializes the value
  serialize(value) {
    return value.toISOString();
  },
});

module.exports = GraphQLDate;
