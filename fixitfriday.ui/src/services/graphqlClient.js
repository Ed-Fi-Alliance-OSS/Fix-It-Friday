import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: 'https://localhost:port', //URL of the GraphQL server
});

export {
  client
}