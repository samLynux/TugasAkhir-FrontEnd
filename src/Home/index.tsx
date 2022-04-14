import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";

import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, {WIDTH_DRAWER} from "./Drawer/Drawer";
import FavouriteOutfits from "./FavouriteOutfits";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";


const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () =>(
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
  </Drawer.Navigator>
)