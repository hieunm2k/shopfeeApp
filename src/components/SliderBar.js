import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, View, useWindowDimensions} from 'react-native';
import {colors} from '~/values/colors';

function SliderBar({nums = 3, index = 0, scrollX}) {
  const sliderArray = Array(nums).fill(0);
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {sliderArray.map((_, i) => {
        const w = width - 40;
        const inputRange = [(i - 1) * w, i * w, (i + 1) * w];
        const widthDot = scrollX.interpolate({
          inputRange,
          outputRange: [12, 24, 12],
          extrapolate: 'clamp',
        });
        const color = scrollX.interpolate({
          inputRange,
          outputRange: [colors.text_disable, colors.brand, colors.text_disable],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={{
              height: 12,
              width: widthDot,
              backgroundColor: color,
              borderRadius: 12,
              marginRight: 8,
            }}></Animated.View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
export default SliderBar;
