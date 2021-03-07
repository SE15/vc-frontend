import Recommendation from '../../components/Recommendation/Recommendation';
import RecommendationPost from '../../components/Recommendation/RecommendationPost';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

import { useState, useEffect } from 'react';

import {
    Button,
    Box
} from '@chakra-ui/react';

import {
    EmailIcon
} from '@chakra-ui/icons';

import { connect } from 'react-redux';

const Recommendations = ({ recommendationList, loading, isOwner, isAuthenticated }) => {
    const [recommendations , setRecommendations] = useState(recommendationList);

    useEffect(() => {setRecommendations(recommendationList)}, [recommendationList]);

    let button = !isOwner && isAuthenticated ?
        // <Button
        //     leftIcon={<EmailIcon />}
        //     size="sm"
        //     variant="outline"
        //     colorScheme="purple"
        //     isDisabled={loading}
        // >
        //     Post Recommendation
        // </Button>
        <RecommendationPost />
        : <Box h="30px" />;

    return (
        <CardHolder
            heading="Recommendations"
            isLoading={loading}
            button={button}
        >
            {recommendations.length === 0 ? <NoResults message="There are no recommendations" />
                : recommendations.map((recommendation) =>
                    <Recommendation
                        author={`${recommendation.first_name} ${recommendation.last_name}`}
                        description={recommendation.description}
                    />
                )}
        </CardHolder>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined)
    };
};

export default connect(mapStateToProps)(Recommendations);