import SkillCard from '../../components/Skill/SkillCard';
import SkilButton from '../../components/Skill/addSkill';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';
import PopupWindow from '../../components/ContainerTemplates/PopupWindow';

import { useState, useEffect } from 'react';

import {
    addSkill,
    deleteSkill,
    validateSkill
} from '../../api'

import {
    Button,
    Box,
    Input,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import {
    AddIcon
} from '@chakra-ui/icons';

import { connect } from 'react-redux';

const Skills = ({ skillList, isOwner, loading, isAuthenticated, user }) => {
    const [skills, setSkills] = useState(skillList);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => { setSkills(skillList) }, [skillList]);

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

    const onAddSkill = async () => {
        setLoading(true);
        const result = await addSkill(user, { name });
        if (result.data) {
            const skillId = result.data;

            const tempSkills = [...skills];
            tempSkills.push({ id: skillId, name, validations: 0 });
            setSkills(tempSkills);

            generateSuccessMessage('Skill added', `Added the skill, '${name}' to your profile`);
            onClose();
            setName('')
        } else {
            generateErrorMessage('Adding skill', result.message);
        }
        setLoading(false);
    }

    const onDeleteSkill = (skillId, name) => async () => {
        setLoading(true);
        const result = await deleteSkill(user, skillId);
        if(result.data) {
            const skillIndex = skills.findIndex(skill => {
                return skill.id === skillId
            });
            const tempSkills = [...skills];
    
            if (skillIndex > -1) {
                tempSkills.splice(skillIndex, 1);
            }
            setSkills(tempSkills);
            generateSuccessMessage('Skill deleted', `Deleted ${name} from your skills`);
        } else {
            generateErrorMessage('Deleting skill', result.message);
        }
        setLoading(false);
    }

    const onValidateSkill = async () => {

    }

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
                        id={skill.id}
                        isAuth={isAuthenticated}
                        name={skill.name}
                        validations={skill.validations}
                        isOwner={isOwner}
                        isLoading={isLoading}
                        onClick={onDeleteSkill} />
                )}
            <PopupWindow
                title="New Skill"
                buttonName="Add"
                onClick={onAddSkill}
                isLoading={isLoading}
                isOpen={isOpen}
                onClose={onClose}>
                <Input
                    variant="outline"
                    placeholder="Skill Name"
                    bg="transparent"
                    borderColor="purple.700"
                    isRequired
                    isInvalid={name.length === 0}
                    isDisabled={isLoading}
                    onChange={((e) => { setName(e.target.value) }).bind(this)}
                    value={name} />
            </PopupWindow>
        </CardHolder>
    );
}


const mapStateToProps = state => {
    return {
        isAuthenticated: !(state.token === null || state.token === undefined),
        user: state.user
    };
};

export default connect(mapStateToProps)(Skills);