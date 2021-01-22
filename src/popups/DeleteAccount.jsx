import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/react';


import ErrorMessage from '../components/ErrorMessage';

export default function DeleteAccount() {
  const [currentpassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      //await() -confirm the current password from back end
      
      setIsVerified(true);
      setIsLoading(false);
      setShowPassword(false);
      
      

      
    } catch (error) {
      setError('Invalid password');
      setIsLoading(false);
      setCurrentPassword('');
      setShowPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {isVerified ? (
          <Box textAlign="center">
            <Text>Password Changed!</Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsVerified(false)} //go back to the home profile
            >
              Back Profile
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Heading>Delete Account</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired mt={6}>
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*******"
                      size="lg"
                      onChange={event => setCurrentPassword(event.currentTarget.value)}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <Icon name="view-off" />
                        ) : (
                          <Icon name="view" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                
                
                <Button
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Delete'
                  )}
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
}