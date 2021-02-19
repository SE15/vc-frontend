import React from 'react';
import{Input, Stack,Button,InputGroup, InputLeftElement, Box,
    HStack,Divider, FormControl,Flex,Heading,Text} from '@chakra-ui/react';
import { kSecondaryBlue } from '../utils/constants';


const SignInScreen=()=>{
   return([
       <Box h={window.innerHeight*0.07} />,
       <Flex width="Full" align="center" justifyContent="center">
       <Box p={8} maxWidth="85%" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="blueGreen.100">
       <Box textAlign="center" color="blueGreen.100" textStyle="h1">
           <Heading> SignUp </Heading>
       </Box>

           <Box my={4} textAlign="left">
       <form action='submit'>
           <Stack spacing={3}>
               <FormControl isRequired>
                   <InputGroup>
                       <InputLeftElement/>
                       <Input type='email' placeholder='Email' bg="white.100" color="black.600" borderColor="blueGreen.100"/>
                   </InputGroup>
               </FormControl>
               <HStack>
               <FormControl isRequired>
                   <InputGroup>
                       <InputLeftElement/>
                       <Input type='text' placeholder='First Name' bg="white.100" color="black.600" width="100%" borderColor="blueGreen.100"/>
                   </InputGroup>
               </FormControl>
               <FormControl isRequired>
                   <InputGroup>
                       <InputLeftElement/> 
                       <Input type='text' placeholder='Last Name' bg="white.100" color="black.600" borderColor="blueGreen.100"/>
                   </InputGroup>
               </FormControl>
               </HStack>
               <FormControl isRequired>
                   <InputGroup>
                       <InputLeftElement/>
                       <Input type='password' aria-label='password' placeholder='Password' bg="white.100" color="black.600" borderColor="blueGreen.100"/>
                   </InputGroup>
               </FormControl>
            
               <Divider/>
               
               <Button type='submit' variant='solid' boxShadow='sm'_hover={{boxShadow:'md'}} bg="black.500" >
                   Sign Up!</Button> 

           </Stack>
           <Text textStyle="h2" color={kSecondaryBlue} align = "center">
           <br/>
           <a href="login">Already Registered? Log In</a>
           </Text>

       </form>
       </Box>
       </Box>
       </Flex>
   ]
   );
}

export default SignInScreen;