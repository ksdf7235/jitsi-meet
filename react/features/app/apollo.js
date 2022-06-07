import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
    uri: "https://34.64.222.135:4000/graphql",
    cache: new InMemoryCache(),
});
