import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  CircularProgress,
  Text,
  Image,
  Stack
} from '@chakra-ui/core';


import ErrorMessage from '../components/ErrorMessage';

export default function Profile() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      //save fname and lname
      setIsLoggedIn(true);
      setIsLoading(false);
      
    } catch (error) {
      setError('Invalid');
      setIsLoading(false);
      
    }
  };

  

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {isLoggedIn ? (
          <Box textAlign="center">
            <Text>Changed Profile!</Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsLoggedIn(false)}
            >
              Back Profile
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Heading>Profile</Heading>
            </Box>
            <Box height="20px"></Box>
            <Box >
              <center>
              <Image                  
                  borderRadius="full"
                  width="50%"
                  height="50%"
                  objectFit="cover"
                  src="https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
                  alt="Profile Picture"
                />
                </center>
            </Box>
            <Stack align="center">
              <Button
                variantColor="teal"
                variant="outline"
                type="submit"
                alignItems="center"
                mt={4}
              >
                {isLoading ? (
                  <CircularProgress
                    isIndeterminate
                    size="sm"
                    color="teal"
                                      
                  />
                ) : (
                  'Change Picture'
                )}
              </Button>
            </Stack>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name"
                    size="lg"
                    onChange={event => setFName(event.currentTarget.value)}
                  />
                </FormControl>
                <Box height="20px"></Box>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    size="lg"
                    onChange={event => setLName(event.currentTarget.value)}
                  />
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
                    'Save'
                  )}
                </Button>
                <Box height="40px"></Box>
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
                    'Change Password'
                  )}
                </Button>
                <Box height="40px"></Box>
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
                    'Delete Account'
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
