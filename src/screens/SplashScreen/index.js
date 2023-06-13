import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Container from '~/components/Container';
import {colors} from '~/values/colors';

function SplashScreen() {
  return (
    <Container>
      <View style={styles.content}>
        <Image source={require('~/assets/images/coffee_icon.png')} />
        <Text style={styles.text}>Shofee</Text>
        <Text style={styles.secondText}>Let us make your day!</Text>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 48,
    color: colors.brand,
  },
  secondText: {
    fontFamily: 'Quicksand-SemiBold',
    fontsize: 16,
    color: colors.text_Heading,
  },
});
export default SplashScreen;
