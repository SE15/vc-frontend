import SkillCard from '../../components/Skill/SkillCard';
import SkilButton from '../../components/Skill/addSkill';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

import {
    Button,
    Box
} from '@chakra-ui/react';

import {
    AddIcon
} from '@chakra-ui/icons';

import { connect } from 'react-redux';

const Skills = ({ skills, isOwner, loading, isAuthenticated }) => {
    let button = isOwner ?
        // <Button
        //     leftIcon={<AddIcon />}
        //     size="sm"
        //     variant="outline"
        //     colorScheme="purple"
        //     isDisabled={loading}
        // >
        //     Add Skill
        // </Button>
        <SkilButton/>
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
                        isAuth={isAuthenticated}
                        name={skill.name}
                        validations={skill.validations}
                        isOwner={isOwner} />
                )}
        </CardHolder>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined)
    };
};

export default connect(mapStateToProps)(Skills);