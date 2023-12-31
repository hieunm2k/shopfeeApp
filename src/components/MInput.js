import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '~/values/colors';
import {fonts} from '~/values/fonts';

function MInput({title, placeholder, error, ...props}, ref) {
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error);
  const value = props.value;
  useEffect(() => {
    if (props.rules.required) {
      if (value != null) {
        if (value == '') {
          setErrorMessage('This field is required!');
        } else {
          setErrorMessage('');
        }
      }
    }
    if (props.rules.isEmail && active == false) {
      if (value != null) {
        if (value != '') {
          const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (value != null) {
            if (!emailFormat.test(value)) {
              setErrorMessage('Incorrect email format');
            } else {
              setErrorMessage('');
            }
          }
        }
      }
    }
  }, [props.rules.required, props.rules.isEmail, value, active]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        {...props}
        ref={ref}
        cursorColor={colors.text_nonActive}
        style={[
          styles.textInput,
          {borderColor: active ? colors.brand : colors.border_disable},
          active && {borderWidth: 2},
        ]}
        placeholder={placeholder}
        onFocus={() => {
          setActive(true);
        }}
        onBlur={() => {
          setActive(false);
          props.onBlur?.();
        }}
        autoCapitalize="none"
        secureTextEntry={props.password}
      />

      <Text style={styles.error}>{error || errorMessage}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
  title: {
    fontFamily: fonts.regular,
    color: colors.text_Heading,
    fontSize: 12,
    height: 20,
    marginBottom: 4,
    marginLeft: 15,
  },
  textInput: {
    fontFamily: fonts.regular,
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  error: {
    fontFamily: fonts.regular,
    color: colors.red,
    textAlign: 'right',
    lineHeight: 16,
    fontSize: 12,
    marginTop: 2,
    marginRight: 15,
  },
});
export default forwardRef(MInput);
