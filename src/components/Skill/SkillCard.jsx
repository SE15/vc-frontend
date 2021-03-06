
import {
    Box,
    HStack,
    Text,
    IconButton,
    Tooltip,
    Spacer
} from "@chakra-ui/react";

import {
    DeleteIcon,
    ArrowUpIcon
} from '@chakra-ui/icons';

const SkillCard = ({ validations, name, isOwner, onClick }) => {
    const icon = isOwner ? <DeleteIcon />
        : <Tooltip label="Validate" fontSize="md">
            <ArrowUpIcon />
        </Tooltip>;
    const color = isOwner ? "red" : "green";

    return (
            <HStack 
            overflow="hidden" 
            w="100%" 
            h="60px" 
            borderWidth="1px" 
            borderRadius="lg" 
            px={4} py={2} 
            bg="purple.100" 
            boxShadow="lg"
            minWidth="350px"
            >
                <Text color="purple.700" fontWeight="bold" pt={1} pr={6}>{validations}</Text>
                <Text color="gray.700" fontWeight={500} align="left">{name}</Text>
                <Spacer />
                <IconButton
                    variant="ghost"
                    colorScheme={color}
                    icon={icon} 
                    onClick={onClick}/>
            </HStack>
    );
}

export default SkillCard