import { Input, Heading, InputGroup, InputLeftElement, Box,
    HStack, IconButton, Spacer,Button, Image, Container} from "@chakra-ui/react"
import { Search2Icon,BellIcon,SettingsIcon } from '@chakra-ui/icons'
import {React,useState} from 'react'
import { kPrimaryBlack, kSecondaryBlue } from '../utils/constants'
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

function Header(props) {

   return ([
           <Box bg={kPrimaryBlack} w="100%" p={5}  position="fixed" color="white" h = {16} p= {2}>
               <HStack>
                    <Image 
                        src = {logo}
                        htmlWidth = "60px"
                        />
                    <Heading  size="md" color="black.500">
                        Volunteer Circle
                    </Heading>
                    <Spacer />
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
                   <SignButton type={props.type}/>                  
                   </HStack>
                   
               </HStack>
           </Box>,
           <Box h = {16} bg = {kSecondaryBlue}/>
   ]
   )
}

function SignButton(props){
   if(props.type==false){
       //Guest
       return(
           <HStack>
           <Button size="md" bg="blueGreen.100" >Sign In</Button> 
       </HStack>); 
   }
   if(props.type==true){
       return(
           <HStack>
               <IconButton icon={<BellIcon />} bg="blueGreen.200"/>
                <IconButton icon={<SettingsIcon />} bg="blueGreen.200" />
                <NavLink
                    to="/logout"
                    activeStyle={{
                    fontWeight: "bold",
                    color: "white"
                    }}
                    >Sign Out</NavLink>
           </HStack>
           );
   }
   
}


export default Header;