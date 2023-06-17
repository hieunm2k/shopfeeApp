import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Container from '~/components/Container';
import Loading from '~/components/Loading';
import MButton from '~/components/MButton';
import MInput from '~/components/MInput';
import Toast from '~/components/Toast';
import {register} from '~/ultities/Auth';
import {colors} from '~/values/colors';
import {fonts} from '~/values/fonts';

function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
    rePassword: null,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const refPassword = useRef();
  const refRePassword = useRef();
  const toastRef = useRef();
  useEffect(() => {
    if (
      inputs.email &&
      inputs.password &&
      inputs.rePassword == inputs.password
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [inputs.email, inputs.password, inputs.rePassword]);
  const handleOnChange = (text, input) => {
    setInputs(prev => ({...prev, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prev => ({...prev, [input]: errorMessage}));
  };
  const checkRePassword = () => {
    if (inputs.rePassword && inputs.password) {
      if (inputs.rePassword !== inputs.password) {
        handleError('Re-password is different from password', 'rePassword');
      } else {
        handleError('', 'rePassword');
      }
    } else {
      handleError('', 'rePassword');
    }
  };
  const handleNext = refNext => {
    refNext.current.focus();
  };
  const handleRegister = () => {
    setLoading(true);
    register(inputs.email, inputs.password)
      .then(() => {
        setLoading(false);
        toastRef.current.show('Đăng ký thành công');
      })
      .catch(err => {
        setLoading(false);
        toastRef.current.show('Đăng ký thất bại: ', err);
      });
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <>
      <Container>
        <KeyboardAvoidingView style={{flex: 1}}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={styles.logo}>
                <Image source={require('~/assets/images/logo.png')} />
              </View>
              <View style={styles.form}>
                <MInput
                  title="Email"
                  placeholder="Input your email"
                  value={inputs.email}
                  onChangeText={t => handleOnChange(t, 'email')}
                  error={errors.email}
                  rules={{required: true, isEmail: true}}
                  returnKeyType="next"
                  onSubmitEditing={() => handleNext(refPassword)}
                />
                <MInput
                  ref={refPassword}
                  title="Password"
                  placeholder="Input your password"
                  password
                  value={inputs.password}
                  onChangeText={t => handleOnChange(t, 'password')}
                  rules={{required: true}}
                  onEndEditing={checkRePassword}
                  error={errors.password}
                  returnKeyType="next"
                  onSubmitEditing={() => handleNext(refRePassword)}
                />
                <MInput
                  ref={refRePassword}
                  title="Re-Password"
                  placeholder="Input your re-password"
                  password
                  value={inputs.rePassword}
                  onChangeText={t => handleOnChange(t, 'rePassword')}
                  onEndEditing={checkRePassword}
                  rules={{required: true}}
                  error={errors.rePassword}
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <View style={{marginHorizontal: 50, marginTop: 16}}>
                  <Text style={styles.text}>
                    By tapping "Register" you agree to our{' '}
                    <Text style={{color: colors.blue}}>Terms of Use</Text> and
                    <Text style={{color: colors.blue}}> Privacy Policy</Text>
                  </Text>
                </View>
                <MButton
                  disabled={!active ? true : false}
                  style={[
                    {
                      marginTop: 28,
                      backgroundColor: active
                        ? colors.brand
                        : colors.text_disable,
                    },
                  ]}
                  onPress={handleRegister}>
                  <Text style={{fontFamily: fonts.medium, color: colors.white}}>
                    Register
                  </Text>
                </MButton>
                <View style={styles.footer}>
                  <Text style={styles.textBottom}>Have an account? </Text>
                  <TouchableOpacity onPress={goToLogin}>
                    <Text style={[styles.textBottom, {color: colors.brand}]}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Container>
      {loading && <Loading />}
      <Toast ref={toastRef} />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 2,
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
