import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from "apollo-upload-client";
import {AsyncStorage} from 'react-native';
import {ApolloLink, fromPromise} from 'apollo-link';
import {setContext} from 'apollo-link-context'

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};
//mobile wifi 192.168.43.2
//mh9A 192.168.100.106
//192.168.100.112
// Instantiate required constructor fields


const authHeader = setContext(
  request =>
    new Promise((success, fail) => {
      getToken().then(token => {
        success({ headers: { authorization: `Bearer ${token}` }})
      
      })
    })
)

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    errorPolicy: 'all',
  },
}

const cache = new InMemoryCache();
const link = createUploadLink({
  uri: 'http://192.168.43.2:4000/',
});

export const mylink = 'http://192.168.43.2:4000/'

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: authHeader.concat(link),
  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: defaultOptions,
});

export default client;
