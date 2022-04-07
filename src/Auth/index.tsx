import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from '../components/Navigation';
import ForgotPassword from './ForgotPassword';
import Login from './Login';

import Onboard from './Onboard';
import Signup from './Signup';
import Welcome from './Welcome';

export const AuthStack = createStackNavigator<Routes>();
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="OnBoarding" component={Onboard} />
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};
