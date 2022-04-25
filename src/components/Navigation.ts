import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// export interface StackNavigationProps<
//   ParamList extends ParamListBase,
//   RouteName extends keyof ParamList = string,
// > {
//   navigation: StackNavigationProp<ParamList, RouteName>;
//   route: RouteProp<ParamList, RouteName>;
// }

export interface AuthNavigationProps<
  RouteName extends keyof AuthRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, RouteName>, 
    DrawerNavigationProp<AppRoutes, "Home"> 
  >
  route: RouteProp<AuthRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
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
  FavouriteOutfits: undefined;
  TransactionHistory:undefined;
  EditProfile: undefined;
  Settings: undefined;
  Cart: undefined;
  Catalog: undefined;
  ProductDetails: undefined;
}