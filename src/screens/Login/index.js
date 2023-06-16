import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import auth from '@react-native-firebase/auth';

function Login() {
  const [active, setActive] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(u => {});
    return subscriber; // unsubscribe on unmount
  }, []);

  const login = () => {
    console.log('inputs:', inputs);
    // try {
    //   auth().signInWithEmailAndPassword('hieunm270900@gmail.com', 'minhhieu2');
    //   // auth().signOut();
    // } catch (err) {
    //   console.log('errSignIn', err);
    // }
  };
  return (
    <Container>
      <KeyboardAvoidingView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.logo}>
              <Image source={require('~/assets/images/logo.png')} />
            </View>

            <View style={styles.form}>
              <MInput
                title="Username"
                placeholder="Input your username"
                keyboardType="email-address"
                value={inputs.username}
                onChangeText={t => {
                  setInputs({...inputs, username: t});
                }}
                error={errors.username}
              />
              <MInput
                title="Password"
                placeholder="Input your password"
                value={inputs.password}
                onChangeText={t => {
                  setInputs({...inputs, password: t});
                }}
                error={errors.password}
              />

              <MButton
                style={[
                  {
                    marginTop: 18,
                    backgroundColor: active
                      ? colors.brand
                      : colors.text_disable,
                  },
                ]}
                onPress={login}>
                <Text style={{fontFamily: fonts.medium, color: colors.white}}>
                  Login
                </Text>
              </MButton>
              <View style={styles.footer}>
                <Text style={styles.textBottom}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text style={[styles.textBottom, {color: colors.brand}]}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
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
    flex: 7,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 150,
  },
  textBottom: {
    fontFamily: fonts.medium,
    color: colors.text_Heading,
  },
});
export default Login;
