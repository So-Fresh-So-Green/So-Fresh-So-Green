const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload

  type FileUploadResponse {
    ETag: String!
    Location: String!
    key: String!
    Key: String!
    Bucket: String!
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    postedAt: String
    price: Float
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
    email: String!
    password: String
    profPic: String
    posts: [Post]
    plants: [Plant]
    followers: [User]
    following: [User]
    orders: [Order]
  }

  type Post {
    _id: ID!
    body: String!
    createdAt: String!
    image: String
    username: String!
    userId: ID!
    comments: [Comment]
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    userId: ID!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Plant {
    _id: ID!
    name: String!
    waterSched: String
    image: String
    description: String
    createdAt: String!
    username: String!
    userId: ID!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }


  type Message {
    _id: ID!
    content: String!
    sender: String!
    createdAt: String!
    
  }

  type Chat {
    _id: ID!
    messages: [Message]
    recipientsId: String!
    createdAt: String,
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    getProduct(_id: ID!): Product
    getUser: User
    getOrder(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    posts: [Post]
    getPost(postId: ID!): Post
    getUserPost(user: ID!): [Post]
    getMessages: [Message]
    getChats(email: String!): [Chat]

  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String, email: String, password: String): User
    createProduct(name: String!, description: String, image: String, price: Int, plant: ID, category: ID): Product
    updateProduct(_id: ID!, name: String, description: String, image: String, price: Int, plant: ID, category: ID): Product
    login(email: String!, password: String!): Auth
    register(registerInput: RegisterInput): User
    createPost(body: String!, image: String): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    addPlant(name: String!, waterSched: String, image: String, description: String): Plant!
    deletePlant(plantId: ID!): String!
    postMessage(recipientsId: [String!], sender: String, content: String): Chat
    addChat(recipientsId: [String]!): Chat
    fileUpload(file: Upload!): File!
  }
 
`;

module.exports = typeDefs;
