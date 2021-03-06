import { React } from "react"
//import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { Text, Avatar, HStack, Button, Spacer, ReactRouterLink } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom';


function Connection({ name, user, image, widthAuto }) {
    const history = useHistory();

    return (
        <HStack
            overflow="hidden"
            h="70px"
            borderWidth="1px"
            borderRadius="lg"
            px={4}
            py={2}
            bg="purple.100"
            boxShadow="lg"
            spacing={4}
            width={widthAuto? "100%" : "350px"}>
            <Avatar name={name} src={image} />
            <Text color="gray.700" fontWeight={500} align="center" fontSize={16} overflow="hidden" isTruncated>{name}</Text>
            <Spacer />
            <Button
                leftIcon={<ExternalLinkIcon />}
                variant="link"
                colorScheme="blue"
                pb={1}
                onClick={() => { history.push(`/profiles/${name}`, { user }) }}>
                view
            </Button>
        </HStack>
    )
}

Connection.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
}
Connection.defaultProps = {
    image: "null"
}
export default Connection  