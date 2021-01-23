import { Input, Heading, InputGroup, InputLeftElement, Box,
     HStack, IconButton, Spacer,Button} from "@chakra-ui/react"
import { Search2Icon,BellIcon,SettingsIcon } from '@chakra-ui/icons'
import {React,useState} from 'react' 

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isUser, setUser] = useState(true);
    return (
        <>
            <Box bg="white.200" w="100%" p={5} color="white">
                <HStack>
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
                    <SignButton type={isLoggedIn}/>
                   
                    </HStack>
                    
                </HStack>
            </Box>
        </>
    )
}

function SignButton(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUser, setUser] = useState(true);
    if(props.type==false){
        //Guest
        return(
            <HStack>
            <Button size="md"  bg="blueGreen.100" >Sign Up</Button>
            <Button size="md" bg="blueGreen.100" onClick={()=>setIsLoggedIn(true)}>Login</Button> 
        </HStack>); 
    }
    if(props.type==true){
        return(
            <Button size="md" bg="blueGreen.100" onClick={()=>setIsLoggedIn(false)}>LogOut</Button> );
    }
    
}

export default NavBar;
