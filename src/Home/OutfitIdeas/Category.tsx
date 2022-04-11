import  React, { useState } from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';

interface CategoryProps {
    category: {
        id: string;
        color: string;
        title: string;

    }
}


const Category = ({category: {color: backgroundColor,title}}: CategoryProps) => {
    const [selected, setSelected] = useState(false)
    return (
        <>
        <BorderlessButton onPress={() => setSelected((prev) => !prev)}>
        <Box 
            marginLeft="m" alignItems="center"
            marginTop="m"
        >
            <View style={{
                width: 60, height: 60, borderRadius: 30,
                backgroundColor
            }}>

            </View>
            <Text textAlign="center" marginTop="s">
                {title}
            </Text>
        </Box>
        </BorderlessButton>
        </>
    )
}

export default Category;