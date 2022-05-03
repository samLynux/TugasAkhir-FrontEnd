import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";

import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, {WIDTH_DRAWER} from "./Drawer/Drawer";
import FavouriteOutfits from "./FavouriteOutfits";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import Cart from "./Cart";
import Catalog from "./Catalog";
import ProductDetails from "./ProductDetails";
import { CartContextProvider } from "./services/cart.context";
import TransactionDetails from "./TransactionHistory/TransactionDetails";


const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () =>(
  <CartContextProvider>
    <Drawer.Navigator 
      drawerContent={() =><DrawerContent/>}
      screenOptions={{
        drawerStyle: {
          width: WIDTH_DRAWER
        },
        headerShown: false
      }}
    >
      <Drawer.Screen name='OutfitIdeas' component={OutfitIdeas}/>
      <Drawer.Screen name='FavouriteOutfits' component={FavouriteOutfits}/>
      <Drawer.Screen name='TransactionHistory' component={TransactionHistory}/>
      <Drawer.Screen name='EditProfile' component={EditProfile}/>
      <Drawer.Screen name='Settings' component={Settings}/>
      <Drawer.Screen name='Cart' component={Cart}/>
      <Drawer.Screen name='Catalog' component={Catalog}/>
      <Drawer.Screen name='ProductDetails' component={ProductDetails}/>
      <Drawer.Screen name='TransactionDetails' component={TransactionDetails}/>
    </Drawer.Navigator>
  </CartContextProvider>
)