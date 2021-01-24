import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-community/async-storage";

export const authTokenVar = makeVar<null | string>(null);

const getToken = async () => {
  const token = await AsyncStorage.getItem("jwt");
  authTokenVar(token);
};

getToken();
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
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
