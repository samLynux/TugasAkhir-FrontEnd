import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Outfit = {
    id: string,
    label: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
};

// const defaults: Outfit[] = [
//     {
//         label: 'clothe1',
//         price: 12000,
//         quantity: 1,
//         size: "s",
//         image: "https://www.ubuy.co.id/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFSMVhpRnVPS0wuX0FDX1VMMTI1MF8uanBn.jpg"
//     },
// ]

type Cart = [Outfit[], React.Dispatch<React.SetStateAction<Outfit[]>>];

export const CartContext = createContext<Cart>([[], () => null]);

export const CartContextProvider = ({children}: {children: React.ReactNode}) => {
    const [products, setProducts] = useState<Outfit[]>([]);

    const saveFavorites = async (value: Outfit[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@cart`, jsonValue)
        } catch(e){
            console.log("error storing",e);
        }
    }

    const loadFavorites = async () => {
        
        try {
            const value = await AsyncStorage.getItem(`@cart`)
            if(value !== null){
                setProducts(JSON.parse(value))
            }
        } catch(e){
            console.log("error loading",e);
        }
    }

    


    useEffect(() => {
        loadFavorites()
    },[])

    

    useEffect(() => {
        saveFavorites(products)
        
    },[products])




    return (
        <CartContext.Provider 
            value={[products, setProducts]}
        >
            {children}
        </CartContext.Provider>
    );
};


