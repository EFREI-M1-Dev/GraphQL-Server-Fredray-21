import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from "./resolvers.js";
import { TrackAPI } from "./datasources/TrackAPI.js";
import { typeDefs } from "./schema.js";
import { GhibliAPI } from "./datasources/GhibliAPI.js";
import { getUserFromToken } from "./modules/auth.js";
import consola from 'consola';  
import db from './datasources/db.js'


const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const { cache } = server
    const authorization = (req.headers.authorization)?.split('Bearer ')?.[1]
    const user = authorization ? getUserFromToken(authorization) : null;
    return {
      dataSources: {
        trackAPI: new TrackAPI({ cache }),
        ghibliAPI: new GhibliAPI({ cache }),
        db
      },
      user
    }
  }
})

consola.log(`🚀  Server ready at: ${url}`)