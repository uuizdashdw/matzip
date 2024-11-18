import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';

import AuthStackNavigator from './src/navigations/stack/AuthStackNavigator';
import RootNavigator from './src/navigations/root/RootNavigator';

// React-Query
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
