import { Component } from 'react';
import {
    VStack,
    Grid,
    GridItem,
    Heading,
} from '@chakra-ui/react';

import ChangeProfilePicture from '../containers/Settings/ChangeProfilePicture';
import ChangeName from '../containers/Settings/ChangeName';
import DeleteAccount from '../containers/Settings/DeleteAccount';
import ChangePassword from '../containers/Settings/ChangePassword';

class Settings extends Component {
    render() {
        return (
            <VStack pl={{ base: 4, sm: 100 }}  py={window.innerHeight / 30}>
                <Heading pb={2} w="100%" align="center" color="gray.700">Profile Settings</Heading>
                <Grid
                    h="100%"
                    w="100%"
                    templateRows="repeat(11, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    gap={4}
                >
                    <GridItem rowSpan={7} colSpan={2} aling="center" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100">
                        <ChangeProfilePicture />
                    </GridItem>
                    <GridItem rowSpan={5} colSpan={3} aling="center" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100">
                        <ChangeName />
                    </GridItem>
                    <GridItem rowSpan={6} colSpan={3} aling="center" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100">
                        <ChangePassword />
                    </GridItem>
                    <GridItem rowSpan={4} colSpan={2} aling="center" borderWidth={3} borderRadius={8} boxShadow="lg" bg="white.200" borderColor="purple.100">
                        <DeleteAccount />
                    </GridItem>
                </Grid>
            </VStack>
        );
    }
}

export default Settings;