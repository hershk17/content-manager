import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.NODE_PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
