import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import AuthHomeScreen from './src/screens/AuthHomeScreen';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

function App(): JSX.Element {
  const [name, setName] = useState('');
  const handleChangeInput = (text: string) => {
    setName(text);
    console.log('이름 == ', text);
  };
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
