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
} from '@chakra-ui/react';


import ErrorMessage from '../components/ErrorMessage';
import logo from '../assets/logo.png';
import { kPrimaryGray } from '../utils/constants';

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

  //image uploading
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <Flex width="full" align="center" justifyContent="center" >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg = {kPrimaryGray}
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
          </Box >
        ) : (
          <>
            <Box textAlign="center" >
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
                  src = {logo}
                  alt="Profile Picture"
                  ref={uploadedImage}
                />
                </center>
            </Box>
            <Stack align="center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none"
                }}
              />
              <Button
                colorScheme="blue"
                variant="solid"
                type="submit"
                alignItems="center"
                mt={4}
                onClick={() => imageUploader.current.click()}
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
                    <Box borderColor = "blue.500">
                  <Input
                    type="text"
                    placeholder="First Name"
                    size="lg"
                    onChange={event => setFName(event.currentTarget.value)}
                  />
                  </Box>
                </FormControl>
                <Box height="20px"></Box>
                <FormControl>
                <Box borderColor = "blue.500">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    colorScheme = "black"
                    size="lg"
                    onChange={event => setLName(event.currentTarget.value)}
                  />
                  </Box>
                </FormControl>
                <Box height="40px"></Box>
                <Button
                  colorScheme="blue"
                  variant="solid"
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
                <Button
                  colorScheme="blue"
                  variant="solid"
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
                  colorScheme="red"
                  variant="solid"
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