const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://localhost:27017');
mongoose.connection.once('open',() =>{
    console.log('Connected to Database.');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));

app.listen(4000, () =>{
    console.log('Now listening for request on port 4000');
});