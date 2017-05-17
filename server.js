var cors = require('cors');
var express = require('express');
var graphqlHTTP = require('express-graphql');

var schema = require('./src/graphql/schema');

var app  = express();
var PORT = 3001;

app.use('/graphql', cors(), graphqlHTTP({schema, graphiql: true}));
app.listen(PORT);
