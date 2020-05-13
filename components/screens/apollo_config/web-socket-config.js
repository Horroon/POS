import { WebSocketLink } from 'apollo-link-ws';

export const websocketlink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});
