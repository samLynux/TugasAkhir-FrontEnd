import  React, { useEffect, useState } from 'react';
import {  View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Category from './Category';

const categories = [
    
    {
        id: "newin",
        title: "Year-Round",
        color: "#FFE8E9"
    },
    {
        id: "summer",
        title: "Summer",
        color: "#F1E0FF"
    },
    {
        id: "activewear",
        title: "Spring",
        color: "#BFEAF5"
    },
    {
        id: "outlet",
        title: "Autumn",
        color: "#F1E0FF"
    },
    {
        id: "accesories",
        title: "Winter",
        color: "#FFE8E9"
    },
]

interface CategoryProps {
    onPress: (tags: string[]) => void;
}

const Categories = ({onPress}: CategoryProps) => {
    const [tags, setTags]= useState<string[]>([])

    useEffect(() => {
        onPress(tags);
    }, [tags])
    return (
        <View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
            >
                {categories.map(category => (
                    <Category key={category.id} category={category}
                        onAdd={ (title) => {
                            if (tags.includes(title) === true){
                                return;
                            }
                            setTags(tags => [...tags, title])
                        }}
                        onRemove={(title) => {
                            
                           setTags( tags.filter(t => t !== title));
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories;