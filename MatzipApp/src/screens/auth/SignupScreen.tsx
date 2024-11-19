import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

// Custom Hook
import useForm from '@/hooks/useForm';

// Components
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';

// Util
import { validateSignup } from '@/utils';

// Custom Hook
import useAuth from '@/hooks/queries/useAuth';

function SignupScreen() {
  const signUp = useForm({
    initialValue: { email: '', password: '', passwordConfirm: '' },
    validate: validateSignup,
  });
  const { signupMutation, loginMutation } = useAuth();

  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {
    const { email, password } = signUp.values;
    console.log('회원가입', { email, password });
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => loginMutation.mutate({ email, password }),
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signUp.errors.email}
          touched={signUp.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signUp.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={signUp.errors.password}
          touched={signUp.touched.password}
          secureTextEntry
          textContentType="oneTimeCode"
          returnKeyType="next"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signUp.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signUp.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
