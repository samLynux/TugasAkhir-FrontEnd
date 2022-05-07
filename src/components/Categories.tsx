import  React, { useEffect, useState } from 'react';
import {  View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Category from './Category';
import CategoryGroup from './CategoryGroup';
import theme from './Theme';

const categories = [
    
    {
        id: "Year-Round",
        title: "Year-Round",
        type: "category",
        color: theme.colors.light_blue
    },
    {
        id: "summer",
        type: "category",
        title: "Summer",
        color: theme.colors.orange
    },
    {
        id: "Spring",
        title: "Spring",
        type: "category",
        color: theme.colors.yellow
    },
    {
        id: "Autumn",
        title: "Autumn",
        type: "category",
        color: theme.colors.leaf_green
    },
    {
        id: "Winter",
        title: "Winter",
        type: "category",
        color: theme.colors.ice_blue
    },
    {
        id: "Nike",
        title: "Nike",
        type: "brand",
        color: theme.colors.pink_orange
    },
    {
        id: "Adidas",
        title: "Adidas",
        type: "brand",
        color: theme.colors.grey
    },
    {
        id: "Pull&Bear",
        title: "Pull&Bear",
        type: "brand",
        color: theme.colors.purple
    },
    {
        id: "H&M",
        title: "H&M",
        type: "brand",
        color: theme.colors.light_green
    },
]

const outfitType = [
    {
        id: "n",
        title: "All",
        type: "Gender",
        color: theme.colors.grey
    },
    {
        id: "f",
        title: "Women",
        type: "Gender",
        color: theme.colors.pink
    },
    {
        id: "m",
        title: "Men",
        type: "Gender",
        color: theme.colors.dark_blue
    },
    
]

interface CategoryProps {
    onPress: (brand: string[], cats: string[], gender: string) => void;
    onRecommend: (active: boolean) => void;
    recommend?: boolean;
}

const Categories = ({onPress, onRecommend, recommend = false}: CategoryProps) => {
    const [brand, setBrand]= useState<string[]>([])
    const [cats, setCats]= useState<string[]>([])
    const [gender, setGender]= useState<string>('n')
    const [forceSelected, setForceSelected] = useState<boolean>(false)

    useEffect(() => {
        
        onPress(brand, cats, gender);
    }, [brand, cats, gender])


    return (
        <View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    recommend && (
                        <Category 
                            category={{
                                id: "Recommend",
                                color: theme.colors.pink_orange,
                                title: "For You",
                            }}
                            onAdd={ () => {
                            setForceSelected(true)
                            onRecommend(true);
                            }}
                            onRemove={() => {
                                setForceSelected(false)
                                onRecommend(false);
                            }}
                        />
                    )
                }
                
                {(!forceSelected || !recommend) &&
                    (
                        <>
                        <CategoryGroup category={outfitType} 
                            optionsCount={3}
                            onPress={(title) => {
                                setGender(title);
                                
                            }}
                        />
                        
                        {categories.map(category => (
                            <Category key={category.id} category={category}
                                onAdd={ (title) => {
                                    if (brand.includes(title) === true){
                                        return;
                                    }
                                    if(category.type === "category"){
                                        setCats(cats => [...cats, title])
                                    }else if(category.type === "brand"){
                                        setBrand(brand => [...brand, title])
                                    }
                                    
                                }}
                                onRemove={(title) => {
                                    
                                    if(category.type === "category"){
                                        setCats( cats.filter(t => t !== title));
                                    }else if(category.type === "brand"){
                                        setBrand( brand.filter(t => t !== title));
                                    }
                                
                                }}
                            />
                            ))}
                        
                        </>
                    )
                
                
                }

                
            </ScrollView>
        </View>
    )
}

export default Categories;