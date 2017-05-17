var graphql = require('graphql');

var peopleData = require('./data');

var PersonType = new graphql.GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
  },
});

var QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      args: {
        limit: {type: graphql.GraphQLInt},
        cursor: {type: graphql.GraphQLInt},
      },
      type: new graphql.GraphQLList(PersonType),
      resolve: (_, {cursor = 0, limit = 10}) => {
        var index = Math.max(0, peopleData.findIndex(people => people.id === cursor));

        return peopleData.slice(index, index + limit)
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({ query: QueryType });
