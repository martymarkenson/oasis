import { GraphQLClient } from 'graphql-request'

const hygraphClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_AUTH_TOKEN}`
    }
  }
)

export default hygraphClient 