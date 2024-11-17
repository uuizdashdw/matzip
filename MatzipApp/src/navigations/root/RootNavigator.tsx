import AuthStackNavigator from '../AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

// 사용자들이 가장 먼저 마주하게 되는 로직들
function RootNavigator() {
  const isLoggedIn = true;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
