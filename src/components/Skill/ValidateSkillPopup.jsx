
import {
    Text,
    IconButton,
    Tooltip,
    useDisclosure,
    Alert, 
    AlertIcon
} from "@chakra-ui/react";

import {
    ArrowUpIcon
} from '@chakra-ui/icons';

import PopupWindow from '../ContainerTemplates/PopupWindow';

const ValidateSkillPopup = ({ name, onClick, isLoading, alreadyValidated }) => {
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
                <Text pb={2}>Do you wish to validate the skill, <Text as="em" color="purple.700">{name}</Text>?</Text>
                <Alert status="warning" borderRadius="1rem" h="25%" w="100%" pt={2}>
                    <AlertIcon />
                    You cannot undo this action once you validate the skill
                </Alert>
            </PopupWindow>
        </>
    );
}

export default ValidateSkillPopup;