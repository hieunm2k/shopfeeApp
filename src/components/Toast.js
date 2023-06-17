import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {colors} from '~/values/colors';
import {fonts} from '~/values/fonts';

function Toast({}, ref) {
  const xOffset = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  const {width} = useWindowDimensions();
  const backgroundColor =
    type == 'success'
      ? colors.green
      : type == 'warning'
      ? colors.primary
      : colors.red;
  const translateX = xOffset.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
    extrapolate: 'clamp',
  });
  const show = (mess, t) => {
    setMessage(mess);
    if (t) {
      setType(t);
    }
    Animated.timing(xOffset, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const close = () => {
    Animated.timing(xOffset, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  useImperativeHandle(ref, () => {
    return {
      show(mess, t) {
        show(mess, t);
        setTimeout(() => {
          close();
        }, 1000);
      },
      close() {
        close();
      },
    };
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: translateX,
            },
          ],
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    elevation: 5,
    top: 20,
    right: 0,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.white,
  },
});
export default forwardRef(Toast);
