import {
    VStack,
    Button,
    Box,
    Heading,
    StackDivider,
    FormControl,
    Input
} from '@chakra-ui/react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';

//TODO: Complete form control
const ChangeName = () => {
    return (
        <GridComponent heading="Change Your Name" isConfirm={true}>
        <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        type="text"
                        placeholder="First Name"
                        size="lg"
                    // onChange={event => setFName(event.currentTarget.value)}
                    />
                </Box>
            </FormControl>
            <FormControl align="center">
                <Box borderColor="blue.500" w="50%">
                    <Input
                        type="text"
                        placeholder="Last Name"
                        colorScheme="black"
                        size="lg"
                    // onChange={event => setLName(event.currentTarget.value)}
                    />
                </Box>
            </FormControl>
        </GridComponent>
    );
}

export default ChangeName;