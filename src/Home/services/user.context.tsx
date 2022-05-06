import React, {createContext,  useEffect,  useState} from "react";
import axios from "axios";
import { CommonActions, useNavigation } from "@react-navigation/native";

type User = {
    address: string;
    email: string;
    firstname: string;
    id: number;
    lastname: string;
  };
  

  
  export const UserContext = createContext<User>(
    {} as User
  );


export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const navigation = useNavigation()
    
    
    
    const [user, setUser] = useState<User>();
    const [userUpdater, setUserUpdater] = useState<boolean>(false);
    
    
    

    useEffect(() => {
        axios.get("user")
        .then((result) => {
            setUser(result.data)
            
            
        }).catch(() => {
            alert("You are not logged in")
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    {name: "Authentication"},
                ]
            }))
            
        })
    },[userUpdater])
    

    
    return ( //@ts-ignore
        <UserContext.Provider value={ [[user, setUser], [userUpdater,setUserUpdater]]}>
        {children}
        </UserContext.Provider>
    );
};


