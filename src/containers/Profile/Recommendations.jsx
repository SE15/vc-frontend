import Recommendation from '../../components/Recommendation/Recommendation';
import RecommendationPost from '../../components/Recommendation/RecommendationPost';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';
import PopupWindow from '../../components/ContainerTemplates/PopupWindow';

import { useState, useEffect } from 'react';

import { submitRecommendation } from '../../api';

import {
    Button,
    Box,
    useDisclosure,
    useToast,
    Textarea,
    HStack,
    Avatar,
    Text,
    VStack,
    StackDivider
} from '@chakra-ui/react';

import {
    EmailIcon
} from '@chakra-ui/icons';

import { connect } from 'react-redux';

const Recommendations = ({ recommendationList, loading, isOwner, isAuthenticated, user, firstName, lastName }) => {
    const [recommendations, setRecommendations] = useState(recommendationList);
    const [description, setDescription] = useState('');
    const [isLoading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => { setRecommendations(recommendationList) }, [recommendationList]);

    const generateSuccessMessage = (title, message) => {
        toast({
            position: "bottom-left",
            title: `${title} successfully`,
            description: message,
            status: "success",
            isClosable: true,
            htmlWidth: 200
        });
    }

    const generateErrorMessage = (title, message) => {
        toast({
            position: "bottom-left",
            title: `${title} failed`,
            description: message,
            status: "error",
            isClosable: true,
            htmlWidth: 200
        });
    }

    const onPostRecommendation = async () => {
        setLoading(true);
        const result = await submitRecommendation(user, { description });
        if (result.data) {
            const tempRecommendations = [...recommendations];
            console.log(tempRecommendations);
            tempRecommendations.push({ id: tempRecommendations.length + 1, first_name: firstName, last_name: lastName, description });
            setRecommendations(tempRecommendations);

            generateSuccessMessage('Recommendation posted', `Your recommendation has posted`);
            onClose();
            setDescription('')
        } else {
            generateErrorMessage('Posting recommendation', result.message);
        }
        setLoading(false);
    }

    let button = !isOwner && isAuthenticated ?
        <Button
            leftIcon={<EmailIcon />}
            size="sm"
            variant="outline"
            colorScheme="purple"
            isDisabled={isOpen || loading}
            onClick={onOpen}
        >
            Post Recommendation
        </Button>
        : <Box h="30px" />;

    return (
        <CardHolder
            heading="Recommendations"
            isLoading={loading}
            button={button}
        >
            {recommendations.length === 0 ? <NoResults message="There are no recommendations" />
                : recommendations.map((recommendation, index) =>
                    <Recommendation
                        key={index}
                        author={`${recommendation.first_name} ${recommendation.last_name}`}
                        description={recommendation.description}
                    />
                )}
            <PopupWindow
                title="Post Recommendation"
                buttonName="Post"
                onClick={onPostRecommendation}
                isLoading={isLoading}
                isOpen={isOpen}
                onClose={onClose}>
                <HStack
                    gap={4}
                    w="100%"
                    px={4}
                    py={2}
                    align="top"
                    spacing={3}
                    minWidth="350px"
                >
                    <Avatar name={`${firstName} ${lastName}`} size="md" />//TODO: add profile image as src
                    <VStack align="left">
                        <Text color="gray.600" fontWeight="bold" align="left">{firstName} {lastName}</Text>
                        <StackDivider borderWidth="1px" borderColor="purple.200" />
                        <Textarea
                            w="280px"
                            variant="outline"
                            placeholder="type your recommendation..."
                            bg="transparent"
                            borderColor="purple.700"
                            isRequired
                            isInvalid={description.length === 0}
                            isDisabled={isLoading}
                            onChange={((e) => { setDescription(e.target.value) }).bind(this)}
                            value={description} />
                    </VStack>
                </HStack>
            </PopupWindow>
        </CardHolder>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined),
        firstName: state.firstName,
        lastName: state.lastName
    };
};

export default connect(mapStateToProps)(Recommendations);