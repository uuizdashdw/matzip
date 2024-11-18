import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '../../hooks/queries/useAuth';
import { useEffect } from 'react';

// 사용자들이 가장 먼저 마주하게 되는 로직들
function RootNavigator() {
  const { isLogin } = useAuth();

  useEffect(() => {
    console.log('## 로그인 성공 여부 :: ', isLogin);
  }, [isLogin]);

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
