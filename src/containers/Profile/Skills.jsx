import SkillCard from '../../components/Skill/SkillCard';
import SkilButton from '../../components/Skill/addSkill';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';
import PopupWindow from '../../components/ContainerTemplates/PopupWindow';



import {
    Button,
    Box,
    useDisclosure
} from '@chakra-ui/react';

import {
    AddIcon
} from '@chakra-ui/icons';

import { connect } from 'react-redux';

const Skills = ({ skills, isOwner, loading, isAuthenticated }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    let button = isOwner ?
        <Button
            leftIcon={<AddIcon />}
            size="sm"
            variant="outline"
            colorScheme="purple"
            isDisabled={loading}
            onClick={onOpen}
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
                        key={skill.id}
                        isAuth={isAuthenticated}
                        name={skill.name}
                        validations={skill.validations}
                        isOwner={isOwner} />
                )}
            <PopupWindow
                title="New Skill"
                buttonName="Add"
                onClick={() => {}}
                isLoading={loading}
                isOpen={isOpen}
                onClose={onClose}>

            </PopupWindow>
        </CardHolder>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined)
    };
};

export default connect(mapStateToProps)(Skills);