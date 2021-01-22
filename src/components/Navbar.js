import { Input, Heading, InputGroup, InputLeftElement, Box,
     HStack, IconButton, Spacer} from "@chakra-ui/react"
import { Search2Icon,BellIcon,SettingsIcon } from '@chakra-ui/icons'
function NavBar() {


    return (
        <>
            <Box bg="white.200" w="100%" p={5} color="white">
                <HStack spacing="1rem">
                    <Heading  size="lg" color="black.500">
                        Volunteer Circle
                    </Heading>
                    <InputGroup w="50%">
                        <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="white.100" />}
                        
                        />
                        <Input type="search" placeholder="Search" color="black.400"/>
                        <IconButton aria-label="Search database" icon={<Search2Icon />} bg="blueGreen.400"/>
                    </InputGroup>
                    <Spacer/>
                    <HStack>
                    <IconButton icon={<BellIcon />} bg="blueGreen.200"/>
                    <IconButton icon={<SettingsIcon />} bg="blueGreen.200" />
                    </HStack>
                    
                </HStack>
            </Box>
        </>
    )
}

export default NavBar;
