const express = require("express");
const app = express();
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");

/**
 * Int
 * Boolean
 * String
 * List -[]
 */

let message = "This is a message";

const schema = buildSchema(`

type Post{
    userId:Int
    id:Int
    title:String
    body:String
}

type User{
    firstName:String
    age:Int
    college:String
}
type Query{
    gilbert:String
    wellcomeFunction(name:String, days:String):String
    ages:Int
    getUser:User
    getUsers:[User]
    getPostsFromExternalAPI: [Post]
    
 message:String
}

type Mutation {
    setMessage(newMessage:String):String
}
`);

const root = {
  gilbert: () => {
    let name = "Keza";
    return name;
  },
  wellcomeFunction: (args) => {
    console.log(args);
    return `Hello Mr ${args.name} to day is ${args.days}`;
  },

  getUser: () => {
    const user = {
      firstName: "Muheto hodallll",
      age: 89,
      college: "IT Guwati",
    };
    return user;
  },
  getUsers: () => {
    const user = [
      {
        firstName: "Muheto hodallll",
        age: 89,
        college: "IT Guwati",
      },
      {
        firstName: "keza divine",
        age: 89,
        college: "IT Guwati",
      },
      {
        firstName: "uwineza patience",
        age: 89,
        college: "IPRC Kigari",
      },
    ];
    return user;
  },

  getPostsFromExternalAPI: async () => {
    const result = await axios
      .get("https://jsonplaceholder.typicode.com/users/1/posts")
      .then((res) => res.data);
    return result;
  },
  setMessage: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
  message: () => message,
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => console.log(`🔥Server is Running at 4000`));
