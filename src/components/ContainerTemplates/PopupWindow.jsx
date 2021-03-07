import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button
} from '@chakra-ui/react';

const PopupWindow = ({ title, buttonName, onClick, isLoading, children, isOpen, onClose }) => {
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
            closeOnEsc={false}
            closeOnOverlayClick={false}
            colorScheme="purple"
        >
            <ModalOverlay />
            <ModalContent bg="purple.100">
                <ModalHeader align="center" fontWeight='bold' color="gray.700">{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="purple" mr={3} onClick={onClick} isLoading={isLoading}>
                        {buttonName}
                    </Button>
                    <Button colorScheme="red" onClick={onClose} isDisabled={isLoading}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PopupWindow;