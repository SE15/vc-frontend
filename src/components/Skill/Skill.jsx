
import {
    Box,
    HStack,
    Text,
    IconButton,
    Tooltip,
    Spacer,
    useDisclosure,
    Alert, 
    AlertIcon
} from "@chakra-ui/react";

import {
    DeleteIcon,
    ArrowUpIcon
} from '@chakra-ui/icons';

import PopupWindow from '../ContainerTemplates/PopupWindow';


const Skill = ({ validations, name, isOwner, onClick, isAuth, isLoading, id, alreadyValidated }) => {
    const icon = isOwner
        ? <DeletePopup
            name={name}
            onClick={onClick(id, name)}
            isLoading={isLoading} />
        : <ValidatePopup
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
            {isAuth ? <IconButton
                variant="ghost"
                colorScheme={color}
                icon={icon}
                onClick={onClick} />
                : <Box w={10} />}
        </HStack>
    );
}

const DeletePopup = ({ name, onClick, isLoading }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                variant="ghost"
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={onOpen} />
            <PopupWindow
                title="Remove Skill"
                buttonName="Remove"
                onClick={onClick(onClose)}
                isLoading={isLoading}
                isOpen={isOpen}
                onClose={onClose}>
                <Text pb={2}>Do you wish to remove <Text as="em">{name}</Text> from your skills?</Text>
                <Alert status="warning" borderRadius="1rem" h="25%" w="100%" pt={2}>
                    <AlertIcon />
                    You cannot undo this action once you remove the skill
                </Alert>
            </PopupWindow>
        </>
    );
}

const ValidatePopup = ({ name, onClick, isLoading, alreadyValidated }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                variant="ghost"
                colorScheme="green"
                icon={<Tooltip label={`${alreadyValidated ? 'Already validated' : 'Validate' }`} fontSize="md"><ArrowUpIcon /></Tooltip>}
                onClick={onOpen}
                isDisabled={alreadyValidated} />
            <PopupWindow
                title="Validate Skill"
                buttonName="Validate"
                onClick={onClick(onClose)}
                isLoading={isLoading}
                isOpen={isOpen}
                onClose={onClose}>
                <Text pb={2}>Do you wish to validate the skill, <Text as="em">{name}</Text>?</Text>
                <Alert status="warning" borderRadius="1rem" h="25%" w="100%" pt={2}>
                    <AlertIcon />
                    You cannot undo this action once you validate the skill
                </Alert>
            </PopupWindow>
        </>
    );
}

export default Skill;