/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Client from './components/screens/apollo_config/config';
import {ApolloProvider} from 'react-apollo';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Routes from './components/navigation/index';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {store} from './components/redux/store';
import LoginModal from './components/screens/commonscreen/loginModal/index';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ApolloProvider client={Client}>
        <Provider store={store}>
          <Routes />
          <LoginModal />
        </Provider>
        <FlashMessage position="top" duration={3000} />
      </ApolloProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
