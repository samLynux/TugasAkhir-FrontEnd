import  React, { useEffect, useState } from 'react';
import {  View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Category from './Category';
import CategoryGroup from './CategoryGroup';

const categories = [
    
    {
        id: "Year-Round",
        title: "Year-Round",
        type: "category",
        color: "#FFE8E9"
    },
    {
        id: "summer",
        type: "category",
        title: "Summer",
        color: "#F1E0FF"
    },
    {
        id: "Spring",
        title: "Spring",
        type: "category",
        color: "#BFEAF5"
    },
    {
        id: "Autumn",
        title: "Autumn",
        type: "category",
        color: "#F1E0FF"
    },
    {
        id: "Winter",
        title: "Winter",
        type: "category",
        color: "#FFE8E9"
    },
    {
        id: "Nike",
        title: "Nike",
        type: "brand",
        color: "#FFE8E9"
    },
    {
        id: "Adidas",
        title: "Adidas",
        type: "brand",
        color: "#FFE8E9"
    },
    {
        id: "Pull&Bear",
        title: "Pull&Bear",
        type: "brand",
        color: "#FFE8E9"
    },
    {
        id: "H&M",
        title: "H&M",
        type: "brand",
        color: "#FFE8E9"
    },
]

const outfitType = [
    {
        id: "n",
        title: "All",
        type: "Gender",
        color: "#FFE8E9"
    },
    {
        id: "f",
        title: "Women",
        type: "Gender",
        color: "#FFE8E9"
    },
    {
        id: "m",
        title: "Men",
        type: "Gender",
        color: "#FFE8E9"
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
                                color: "#FFE8E9",
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