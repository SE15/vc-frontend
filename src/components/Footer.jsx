import React from "react";
import { Flex, Box, Heading, Stack } from "@chakra-ui/react";
import { kPrimaryBlack } from '../utils/constants';

const Footer = () => {
  return (
      [
          <Box h={5} />,
    <Flex
      width="full"
      position="fixed"
      bottom="0"
      mt={2}
      py={3}
      bg={kPrimaryBlack}
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
      fontSize="16px"
      color = "white"
    >
      Designed by SE15
    </Heading>
  );
};

export default Footer;
