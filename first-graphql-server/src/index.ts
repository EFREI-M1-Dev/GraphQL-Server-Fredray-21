import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const data = [
{ name: 'Dr. Smith', speciality: 'PSYCHOLOGIST' },
  { name: 'Dr. Johnson', speciality: 'OPHTALMOLOGIST' },
];


const typeDefs = `#graphql
  type Doctor {
    name: String
    speciality: SPECIALITY
  }
 
  type Query {
    doctors: [Doctor]
  }
 
  enum SPECIALITY {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
`;

const resolvers = {
    Query: {
        doctors: () => {
            console.log('Fetching doctors');
            return data
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const {url} = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log('Server running on '+url);