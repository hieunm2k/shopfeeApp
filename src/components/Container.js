import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '~/values/colors';

function Container({children}) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
export default Container;
