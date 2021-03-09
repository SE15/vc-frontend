import { useState, useEffect, useRef } from 'react';
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import {
    useToast,
    VStack,
    HStack,
    Box,
    Button,
    useDisclosure,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/react"

import PopupWindow from '../../components/ContainerTemplates/PopupWindow';
import Skills from './Skills';
import Recommendations from './Recommendations';
import Connections from './Connections';
import { connect } from 'react-redux'

import {
    EmailIcon,
    RepeatClockIcon,
    CloseIcon
} from '@chakra-ui/icons';

import { getUser, getConnectionState, addConnection, deleteConnection } from '../../api';

const ProfileContent = ({ authUser, user, isAuthenticated, profilePic }) => {
    const toast = useToast()

    const [profileInfo, setProfileInfo] = useState({ id: null, first_name: null, last_name: null, profile_pic: null });
    const [skills, setSkills] = useState([]);
    const [connections, setConnections] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [button, setButton] = useState(0);

    useEffect(async () => {
        const results = await getUser(user);
        if (results.data) {
            console.log(results.data);
            setProfileInfo({
                id: results.data.id,
                first_name: results.data.first_name,
                last_name: results.data.last_name,
                profile_pic: results.data.profile_pic
            })
            setSkills(results.data.skills);
            setRecommendations(results.data.recommendations)
            setConnections(results.data.connections);

            if (isAuthenticated && authUser !== user) {
                const result = await getConnectionState(authUser, user);
                if (result.data) {
                    switch (result.data) {
                        case 'none':
                            setButton(1);
                            break;
                        case 'accepted':
                            setButton(2);
                            break;
                        case 'pending':
                            setButton(3);
                            break;
                    }
                }
            }
        } else {
            toast({
                position: "bottom-left",
                title: 'Cannot load the profile',
                description: results.message,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
            setError(results);
        }
        setLoading(false);
    }, []);

    let result = (
        <VStack w={window.innerWidth - 20} h="100%" pb={window.innerHeight/15} align="center" justify="space-evenly" px={window.innerWidth/25}>
            <Box w="100%" border="5px" pt={2} align="center">
                <ProfileInfo
                    name={`${profileInfo.first_name} ${profileInfo.last_name}`}
                    isLoading={loading}
                    profilePic={authUser === user ? profilePic : profileInfo.profile_pic} />
                {!loading && <ConnectionButton
                    type={button}
                    user={profileInfo.id}
                    authUser={authUser}
                    name={`${profileInfo.first_name} ${profileInfo.last_name}`}
                    setButton={setButton} />}
            </Box>
            <HStack spacing={6} w="100%">
                <Skills
                    skillList={skills}
                    loading={loading}
                    isOwner={authUser === user} />
                <Recommendations
                    recommendationList={recommendations}
                    loading={loading}
                    user={user}
                    isOwner={authUser === user} />
                <Connections
                    connectionList={connections}
                    loading={loading} />
            </HStack>
        </VStack>
    );

    if (error === null) return result;
    else {
        return (
            <Box w={window.innerWidth} border="5px" pt={2} align="center" justify="center" h="100%" pt={10}>
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    width="50%"
                    align="center"
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        Cannot load the profile
            </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        {error.message}
            </AlertDescription>
                </Alert>
            </Box>
        );
    }
}

const ConnectionButton = ({ type, user, authUser, setButton, name }) => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSendRequest = async () => {
        setLoading(true);
        const result = await addConnection(user);
        if (result.data) {
            setButton(3);
            toast({
                position: "bottom-left",
                title: 'Request sent successfully',
                description: `You have sent a request to ${name}`,
                status: "success",
                isClosable: true,
                htmlWidth: 200
            });
        } else {
            toast({
                position: "bottom-left",
                title: `${result.title}`,
                description: `${result.message}`,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        setLoading(false);
    }

    const onRemoveConnection = (isCancelled) => async () => {
        setLoading(true);
        const result = await deleteConnection(authUser, user);
        if (result.data) {
            setButton(1);
            toast({
                position: "bottom-left",
                title: `Request ${isCancelled ? 'cancelled' : 'removed'} successfully`,
                description: `${isCancelled ? `You have cancelled request to ${name}` : `You have removed ${name} from connections`}`,
                status: "success",
                isClosable: true,
                htmlWidth: 200
            });
        } else {
            toast({
                position: "bottom-left",
                title: `${result.title}`,
                description: `${result.message}`,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        if (!isCancelled) onClose();
        setLoading(false);
    }

    switch (type) {
        case 1:
            return (
                <Button leftIcon={<EmailIcon />} colorScheme="green" variant="outline" my={2} isLoading={loading} onClick={onSendRequest}>
                    Send Request
                </Button>);
        case 2:
            return (
                <>
                    <Button leftIcon={<CloseIcon />} colorScheme="red" variant="outline" my={2} isDisabled={isOpen} onClick={onOpen}>
                        Remove Connection
                    </Button>
                    <PopupWindow
                        title='Connection Remove'
                        buttonName='Confirm'
                        onClick={onRemoveConnection(false)}
                        isLoading={loading}
                        isOpen={isOpen}
                        onClose={onClose}>
                        Do you wish to remove <Text as="em">{name}</Text> from your connections?
                     </PopupWindow>
                </>);
        case 3:
            return (
                <Button leftIcon={<RepeatClockIcon />} colorScheme="orange" variant="outline" my={2} isLoading={loading} onClick={onRemoveConnection(true)}>
                    Request Pending
                </Button>);
        default:
            return (<div></div>)
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        authUser: state.user,
        profilePic: state.profilePic
    };
};

export default connect(mapStateToProps)(ProfileContent);