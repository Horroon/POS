import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from 'apollo-upload-client';
import {AsyncStorage} from 'react-native';
import {ApolloLink, fromPromise, split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {websocketlink} from './web-socket-config';
import {getMainDefinition} from 'apollo-utilities';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

//mobile wifi 192.168.43.2
//mh9A 192.168.100.106
//192.168.100.112
//lala wifi 192.168.8.102
//hostel wifi 192.168.18.151
// Instantiate required constructor fields

const authHeader = setContext(
  () =>
    new Promise((success, fail) => {
      getToken().then(token => {
        success({headers: {authorization: `Bearer ${token}`}});
      });
    }),
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    errorPolicy: 'all',
  },
};

//const QueryMutationLink = authHeader.concat(mylink);
//authHeader.concat('http://192.168.18.151:4000/')

export const mylink = new HttpLink({uri: 'http://192.168.18.151:4000/'});
const link = split(
  // split based on operation type
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  websocketlink,
  mylink,
);

const cache = new InMemoryCache();
/* const network_link = createUploadLink({
  uri: link,
}); */

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  //link: network_link,
  link: authHeader.concat(link),
  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: defaultOptions,
});

export default client;
