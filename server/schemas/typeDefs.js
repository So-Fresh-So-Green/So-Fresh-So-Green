const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Plant {
    _id: ID
    name: String
    waterSched: String
    image: String
    description: String
    createdAt: String
    user: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    postedAt: String
    price: Float
    quantity: Int
    plant: Plant
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    profPic: String
    posts: [Post]
    comments: [Comment]
    plants: [Plant]
    followers: [User]
    following: [User]
    orders: [Order]
  }

  # type Post {
  #   _id: ID
  #   title: String
  #   content: String
  #   createdAt: String
  #   username: String
  #   plant: Plant
  #   comments: [Comment]
  # }

  type Post {
    _id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Comment {
    content: String
    createdAt: String
    username: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    getPosts: [Post]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
