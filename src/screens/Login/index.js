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
import MButton from '~/components/MButton';
import MInput from '~/components/MInput';
import {colors} from '~/values/colors';
import {fonts} from '~/values/fonts';
import {login} from '~/ultities/Auth';
import Loading from '~/components/Loading';
import Toast from '~/components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '~/redux/Actions/authAction';

function Login() {
  const {loading, success, error, uid} = useSelector(state => state.auth);
  useEffect(() => {
    console.log('user uid:', loading);
  }, [uid, loading]);
  const [active, setActive] = useState(false);
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const refPassword = useRef();
  const toastRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (inputs.email && inputs.password) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [inputs.email, inputs.password]);
  const handleNext = refNext => {
    refNext.current.focus();
  };
  const handleLogin = () => {
    Keyboard.dismiss();
    try {
      const data = {
        email: inputs.email,
        password: inputs.password,
      };
      dispatch(loginUser(data));
      // setLoading(true);
      // login(inputs.email, inputs.password)
      //   .then(user => {
      //     setLoading(false);
      //     toastRef.current.show('Đăng nhập thành công', 'success');
      //     console.log('userid', user.user.uid);
      //   })
      //   .catch(err => {
      //     setLoading(false);
      //     if (err.code == 'auth/wrong-password') {
      //       toastRef.current.show('Mật khẩu không chính xác', 'error');
      //     }
      //     if (err.code == 'auth/user-not-found') {
      //       toastRef.current.show('Tài khoản không tồn tại', 'error');
      //     }
      //     // console.log(err.code);
      //   });
    } catch (err) {
      console.log('errSignIn', err);
    }
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
                  keyboardType="email-address"
                  value={inputs.email}
                  onChangeText={t => {
                    setInputs({...inputs, email: t});
                  }}
                  error={errors.email}
                  rules={{required: true, isEmail: true}}
                  returnKeyType="next"
                  onSubmitEditing={() => handleNext(refPassword)}
                />
                <MInput
                  ref={refPassword}
                  title="Password"
                  placeholder="Input your password"
                  value={inputs.password}
                  onChangeText={t => {
                    setInputs({...inputs, password: t});
                  }}
                  error={errors.password}
                  password
                  rules={{required: true}}
                  returnKeyType="done"
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
                  disabled={!active}
                  onPress={handleLogin}>
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
      {loading && <Loading />}
      <Toast ref={toastRef} />
    </>
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
