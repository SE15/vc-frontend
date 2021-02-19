import Skill from './Skill'
const SkillList=(props)=>{
    console.log('skill list'); 
return props.SkillList.map((skill,index)=>{
    return (
    <Skill
    name={skill.skillname}
    validations={skill.validations}
    visit={skill.visit}/>
    );
});
}
export default SkillList