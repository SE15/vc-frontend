import {
    VStack,
    Button,
    Box,
    Heading,
    StackDivider,
    FormControl,
    Input
} from '@chakra-ui/react';
import GridComponent from '../../components/GridComponent/GridComponent';

//TODO: Complete form control
const ChangePassword = () => {
    return (
        <GridComponent heading="Change Your Password" isConfirm={true}>
            <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        type="text"
                        placeholder="Current Password"
                        size="lg"
                    // onChange={event => setFName(event.currentTarget.value)}
                    />
                </Box>
            </FormControl>
            <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        type="text"
                        placeholder="New Password"
                        colorScheme="black"
                        size="lg"
                    // onChange={event => setLName(event.currentTarget.value)}
                    />
                </Box>
            </FormControl>
            <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        type="text"
                        placeholder="Confirm New Password"
                        colorScheme="black"
                        size="lg"
                    // onChange={event => setLName(event.currentTarget.value)}
                    />
                </Box>
            </FormControl>
        </GridComponent>
    );
}

export default ChangePassword;