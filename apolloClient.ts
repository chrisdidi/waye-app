import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import AsyncStorage from "@react-native-community/async-storage";

export const authTokenVar = makeVar<null | string>(null);

const getToken = async () => {
  const token = await AsyncStorage.getItem("jwt");
  authTokenVar(token);
};

getToken();

const wsLink = new WebSocketLink({
  uri: "wss://wayeapp.herokuapp.com/v1/graphql",
  options: {
    reconnect: true,
  },
});
const httpLink = createHttpLink({
  uri: "https://wayeapp.herokuapp.com/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: Boolean(authTokenVar) ? `Bearer ${authTokenVar()}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
