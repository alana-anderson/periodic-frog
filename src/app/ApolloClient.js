const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client');
const { registerApolloClient } = require('@apollo/experimental-nextjs-app-support/rsc');

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});

module.exports = { getClient };
