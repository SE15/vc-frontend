import {
    Box,
    HStack,
    Text,
    IconButton,
    Spacer,
} from "@chakra-ui/react";

import DeleteSkillPopup from './DeleteSkillPopup';
import ValidateSkillPopup from './ValidateSkillPopup';

const Skill = ({ validations, name, isOwner, onClick, isAuth, isLoading, id, alreadyValidated }) => {
    const icon = isOwner
        ? <DeleteSkillPopup
            name={name}
            onClick={onClick(id, name)}
            isLoading={isLoading} />
        : <ValidateSkillPopup
            name={name}
            onClick={onClick(id, name)}
            isLoading={isLoading} 
            alreadyValidated={alreadyValidated}/>;
    const color = isOwner ? "red" : "green";

    return (
        <HStack
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
            {isAuth ? icon
                : <Box w={10} />}
        </HStack>
    );
}

export default Skill;