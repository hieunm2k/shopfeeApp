import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Container from '~/components/Container';
import MButton from '~/components/MButton';
import MInput from '~/components/MInput';
import {colors} from '~/values/colors';
import {fonts} from '~/values/fonts';

function Register() {
  const [active, setActive] = useState(false);
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.logo}>
              <Image source={require('~/assets/images/logo.png')} />
            </View>
            <View style={styles.form}>
              <MInput title="Name" placeholder="Input your name" />
              <MInput
                title="No. Handphone"
                placeholder="Input your No. Handphone"
                keyboardType="phone-pad"
              />
              <View style={{marginHorizontal: 50, marginTop: 16}}>
                <Text style={styles.text}>
                  By tapping "Register" you agree to our{' '}
                  <Text style={{color: colors.blue}}>Terms of Use</Text> and
                  <Text style={{color: colors.blue}}> Privacy Policy</Text>
                </Text>
              </View>
              <MButton
                style={[
                  {
                    marginTop: 28,
                    backgroundColor: active
                      ? colors.brand
                      : colors.text_disable,
                  },
                ]}>
                <Text style={{fontFamily: fonts.medium, color: colors.white}}>
                  Register
                </Text>
              </MButton>
            </View>
            <View style={styles.footer}>
              <Text style={styles.textBottom}>Have an account? </Text>
              <TouchableOpacity>
                <Text style={[styles.textBottom, {color: colors.brand}]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
  },
  form: {
    flex: 5,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textBottom: {
    fontFamily: fonts.medium,
    color: colors.text_Heading,
  },
});
export default Register;
