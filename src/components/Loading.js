import Lottie from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

function Loading() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Lottie source={require('~/assets/images/loader.json')} loop autoPlay />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});
export default Loading;
