import { Box, Text } from "./Theme";

interface LineItemProps{
    label: string;
    value: string;
}

const LineItem = ({value, label} : LineItemProps) => {
    return(
        <Box flexDirection="row" paddingVertical="s" paddingRight="s">
            <Box flex={1}>
                <Text color="white" >{label}</Text>
            </Box>
            <Box>
                <Text color="white">{value}</Text>
            </Box>
        </Box>
    )
}

export default LineItem;