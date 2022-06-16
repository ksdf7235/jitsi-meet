import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
    uri: "https://meet.sj.go.kr:4000/graphql",
    cache: new InMemoryCache(),
});
