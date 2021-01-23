
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Spacer, Heading, Flex, Button, Box, HStack } from "@chakra-ui/react"
import { DeleteIcon,AddIcon} from '@chakra-ui/icons'
import {
    AlertDialog,Badge,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay 
  } from "@chakra-ui/react"

import {React,useState,useRef} from 'react' 

const Skill=props=>{
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
    const [validations, setValidations]=useState(props.validations)
    const [skillname, setSkillname]=useState(props.skillname)

if(props.visit=="0"){
    
                
                    
    return (
        <>
        <Flex>
                    <Box w="20rem" p={4} bg="white.200">
                        <HStack  spacing="3rem">
                        
                        
                            <Badge ml="1" fontSize="0.8em" colorScheme="blue" borderRadius="5rem">
                            {validations}
                            </Badge>
                          
                  
                          
                        <Heading size="md" color="black.600">{skillname}</Heading>
                    
                    <Spacer />
                
                   
                    <Button rightIcon={<DeleteIcon />} colorScheme="red" onClick={()=> setValidations(0)}></Button>
                  
                 
                
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
                   
        
    );
}else{
    return (
        <>
            <Flex>
                    <Box w="20rem" p={4} bg="white.200">
                        <HStack  spacing="3rem">
                        <Badge ml="1" fontSize="0.8em" colorScheme="blue" variant="outline" borderRadius="5rem">
                            {validations}
                            </Badge>
                          
                        <Heading size="md" color="black.600">{skillname}</Heading>
                    
                    <Spacer />
                
                
                   
                    <Button rightIcon={<AddIcon />} colorScheme="blue" onClick={()=> setValidations(validations+1)}>
                    </Button>

                  
                 </HStack>
                    </Box>
                    </Flex>
                    </>
                
                  
                    
    
    );
}


}
Skill.propTypes = {
    skillname: PropTypes.string,
    validations:PropTypes.integer,
    visit:PropTypes.bool
  }
  Skill.defaultProps =   {
      
      visit:"1",
      validations:"0"
  }
  export default Skill