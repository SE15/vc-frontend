import { useState, useEffect, useRef } from 'react';
import ProfileInfo from "../../components/ProfileInfo";
import {
    useToast,
    VStack,
    HStack
} from "@chakra-ui/react"
import Skills from './Skills';
import Recommendations from './Recommendations';
import Connections from './Connections';
import { connect } from 'react-redux'

import { getUser, getConnectionState } from '../../api';

const ProfileContent = ({ authUser, user, isAuthenticated }) => {
    const toast = useToast()

    const [profileInfo, setProfileInfo] = useState({ first_name: null, last_name: null, profile_pic: null });
    const [skills, setSkills] = useState([]);
    const [connections, setConnections] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [button, setButton] = useState(0);

    useEffect(async () => {
        const results = await getUser(user);
        if (results.data) {
            setProfileInfo({
                first_name: results.data.first_name,
                last_name: results.data.last_name,
                profile_pic: results.data.profile_pic
            })
            setSkills(results.data.skills);
            setRecommendations(results.data.recommendations)
            setConnections(results.data.connections);

            if (isAuthenticated && authUser !== user) {
                //TODO: need to call a back-end method to get the status of the connection
                //must pass both authUser and user to retrieve the status of the connection.
                //button is set based on this status. 'none' - 1, 'accepted' - 2, 'pending' - 3 
                const result = await getConnectionState(authUser, user);
                if (result.data) {
                    switch(result.data) {
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
            if (results.code === 1) {
                toast({
                    position: "bottom-left",
                    title: 'Network Error',
                    description: 'Please check your internet connection',
                    status: "error",
                    isClosable: true,
                    htmlWidth: 200
                });
                setNetworkError(true);
            } else {
                setNoResults(true);
            }
        }
        setLoading(false);
    }, []);

    return (
        <VStack w="100%" align="center" px={window.innerWidth / 25} pb={window.innerWidth / 25}>
            <ProfileInfo
                name={`${profileInfo.first_name} ${profileInfo.last_name}`}
                button={button}
                isLoading={loading} />
            <HStack spacing={6} w="100%">
                <Skills
                    skills={skills}
                    loading={loading}
                    isOwner={authUser===user} />
                <Recommendations
                    recommendations={recommendations}
                    loading={loading}
                    isOwner={authUser===user} />
                <Connections
                    connections={connections}
                    loading={loading} />
            </HStack>
        </VStack>
    );
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      authUser: state.user
    };
  };

export default connect( mapStateToProps )( ProfileContent );