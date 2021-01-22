import React from "react";
import { Flex, Box, Heading, Stack } from "@chakra-ui/react";
import { kPrimaryBlackDark } from '../utils/constants';

const Footer = () => {
  return (
      [
          <Box h={5} />,
    <Flex
      width="full"
      position="fixed"
      bottom="0"
      mt={4}
      py={4}
      bg={kPrimaryBlackDark}
      borderTopRadius="1rem"
    >
      <Box width="full" boxShadow="xs">
        <Stack isInline justifyContent="center" px={8}>
          <FooterName />
        </Stack>
      </Box>
    </Flex>
      ]
  );
};

const FooterName = () => {
  return (
    <Heading
      fontSize="20px"
      color = "white"
    >
      Designed by SE15
    </Heading>
  );
};

export default Footer;
