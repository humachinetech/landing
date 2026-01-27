import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const graphqlUri =
  import.meta.env.VITE_GRAPHQL_URI ?? 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: graphqlUri,
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
