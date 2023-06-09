const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const initApollo = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API running on ${PORT}!`);
        console.log(`GraphQl Server http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
};
  

initApollo(typeDefs, resolvers);
