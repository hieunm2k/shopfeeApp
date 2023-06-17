import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from '~/navigation';
import store from '~/redux/store';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
