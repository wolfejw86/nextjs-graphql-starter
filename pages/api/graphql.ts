import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@/apollo/schema';

const server = new ApolloServer({
  schema,
  async context({ req }) {
    // modify context asynchronously to expose to your resolvers

    return {
      req,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
