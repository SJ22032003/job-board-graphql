import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

// Routes
app.post("/login", handleLogin);

// GraphQl

const getUser = ({ req }) => {
  return { user: req.auth };
}; 

const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer, { context: getUser }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQl running on http://localhost:${PORT}/graphql`);
});
