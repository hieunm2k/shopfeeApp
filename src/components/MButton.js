import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '~/values/colors';

function MButton({children, style, ...props}) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
export default MButton;
