import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type AppRoutes ={
  Authentication: undefined;
  Home: undefined;
}


export type AuthRoutes = {
  OnBoarding: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  PasswordChange: undefined;
};

export type HomeRoutes ={
  OutfitIdeas: undefined;
}