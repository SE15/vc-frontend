
import {
    Text,
    IconButton,
    useDisclosure,
    Alert, 
    AlertIcon
} from "@chakra-ui/react";

import {
    DeleteIcon
} from '@chakra-ui/icons';

import PopupWindow from '../ContainerTemplates/PopupWindow';

const DeleteSkillPopup = ({ name, onClick, isLoading }) => {
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
                <Text pb={2}>Do you wish to remove <Text as="em" color="purple.700">{name}</Text> from your skills?</Text>
                <Alert status="warning" borderRadius="1rem" h="25%" w="100%" pt={2}>
                    <AlertIcon />
                    You cannot undo this action once you remove the skill
                </Alert>
            </PopupWindow>
        </>
    );
}

export default DeleteSkillPopup;