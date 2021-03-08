import React from "react";
import { Flex, Box, Heading, Stack } from "@chakra-ui/react";
import { kPrimaryBlack } from '../../utils/constants';

const Footer = () => {
  return (
      [
          <Box h={8} />,
    <Flex
      width="full"
      position="fixed"
      bottom="0"
      py={2}
      bg="purple.700"
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
      fontSize="15px"
      color = "white"
    >
      Designed by SE15
    </Heading>
  );
};

export default Footer;
