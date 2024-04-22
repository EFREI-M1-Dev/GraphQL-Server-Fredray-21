import gql from "graphql-tag";

export const typeDefs = gql`
type Track {
  id: ID!
  title: String!
  author: Author!
  thumbnail: String
  numberOfViews: Int
  numberOfLikes: Int
}

type Author {
  id: ID!
  name: String!
  photo: String
}

type Film {
  id: ID!
  title: String
  people: [People]!
}

type People {
  id: ID!
  name: String
  eyeColor: String
  films: [Film]!
}

type User {
  id: ID!
  username: String!
}

type Query {
  divide(number1: Int!, number2: Int!): Float
  multiply(number1: Int!, number2: Int!): Float
  closestColor(hexa: String!): String
  getTracks: [Track!]!
  getFilms: [Film]!
  getPeople: [People]!
}

type Mutation {
  incrementTrackViews(id: ID!): IncrementTrackViewsResponse
  incrementTrackLikes(id: ID!): IncrementTrackLikesResponse
  createUser(username: String!, password: String!): CreateUserResponse
  signItUser(username: String!, password: String!): SignInUserResponse
}

type IncrementTrackViewsResponse {
  code: Int!
  success: Boolean!
  message: String!
  track: Track
}

type IncrementTrackLikesResponse {
  code: Int!
  success: Boolean!
  message: String!
  track: Track
}

type CreateUserResponse {
  code: Int!
  success: Boolean!
  message: String!
  user: User
}

type SignInUserResponse {
  code: Int!
  success: Boolean!
  message: String!
  token: String
}
`