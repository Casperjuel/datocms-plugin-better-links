import { GraphQLClient } from 'graphql-request'

// This is just to mock gql so that it syntax highlights the query
const gql = query => query[0]

const client = ({ url, token }) => new GraphQLClient(url, {
  headers: {
    Authorization: token,
  },
})

export { gql, client }
