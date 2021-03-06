import Recommendation from '../../components/Recommendation/Recommendation';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

import {
    Button,
    Box
} from '@chakra-ui/react';

import {
    EmailIcon
} from '@chakra-ui/icons';

const Recommendations = ({ recommendations, loading, isOwner }) => {
    let button = !isOwner ?
        <Button
            leftIcon={<EmailIcon />}
            size="sm"
            variant="outline"
            colorScheme="purple"
            isDisabled={loading}
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
                : recommendations.map((recommendation) =>
                    <Recommendation
                        author={`${recommendation.first_name} ${recommendation.last_name}`}
                        description={recommendation.description}
                    />
                )}
        </CardHolder>
    );
}

export default Recommendations;