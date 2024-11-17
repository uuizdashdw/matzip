import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';

import AuthStackNavigator from './src/navigations/stack/AuthStackNavigator';
import RootNavigator from './src/navigations/root/RootNavigator';

function App(): JSX.Element {
  const [name, setName] = useState('');
  const handleChangeInput = (text: string) => {
    setName(text);
    console.log('이름 == ', text);
  };
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
