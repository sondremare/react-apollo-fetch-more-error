import { createNetworkInterface } from 'react-apollo';

export const networkInterface = createNetworkInterface({uri: 'http://localhost:3001/graphql'});
