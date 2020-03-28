import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Drawer from './navigation/Drawer';

const client = new ApolloClient({
  uri: 'https://covid19-graphql.now.sh/',
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </ApolloProvider>
  );
};
