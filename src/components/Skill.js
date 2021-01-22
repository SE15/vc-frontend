import { Spacer, Heading, Flex, Button, Box, HStack } from "@chakra-ui/react"
import { DeleteIcon} from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay 
  } from "@chakra-ui/react"

import {React,useState,useRef} from 'react' 


const Skill = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()




    return (
        <>
            <Flex>
                <Box w="20rem" p={4} bg="white.200">
                    <HStack  spacing="3rem">
                    <Heading size="md" color="black.600">Skill Name</Heading>
                
                <Spacer />
                
                   
                    <Button rightIcon={<DeleteIcon />} colorScheme="red" onClick={() => setIsOpen(true)}></Button>
                    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
            <AlertDialogOverlay>
          <AlertDialogContent>
          <Box bg="white.200" w="80%" p={4} color="white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Skill
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
            </Box>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
                    </HStack>
                </Box>
            </Flex>

        </>
    )
}

export default Skill;
