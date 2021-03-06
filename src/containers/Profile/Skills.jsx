import SkillCard from '../../components/Skill/SkillCard';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

import {
    Button,
    Box
} from '@chakra-ui/react';

import {
    AddIcon
} from '@chakra-ui/icons';

const Skills = ({ skills, isOwner, loading }) => {
    let button = isOwner ?
        <Button
            leftIcon={<AddIcon />}
            size="sm"
            variant="outline"
            colorScheme="purple"
            isDisabled={loading}
        >
            Add Skill
        </Button>
        : <Box h="30px" />;

    return (
        <CardHolder
            heading="Skills"
            isLoading={loading}
            button={button}
        >
            {skills.length === 0 ? <NoResults message="There are no skills" />
                : skills.map((skill) =>
                    <SkillCard
                        name={skill.name}
                        validations={skill.validations}
                        isOwner={isOwner} />
                )}
        </CardHolder>
    );
}
export default Skills;