
import './App.css';
import LoginScreen from './screens/LoginScreen'
import SignInScreen from './screens/SignInScreen'



import NavBar from './components/Navbar';
import Connections from './components/Connections/Connection/Connection';
import ReccomendationPost from './components/Reccomendation/ReccomendationPost';
import Reccomendation from './components/Reccomendation/Reccomendation'
import SkillList from './components/Skills/Skill/SkillList';
import Skill from './components/Skills/Skill/Skill';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <br/>
        <Skill skillname="Organizing" validations={4} visit={true}/>
        <Skill skillname="Leadership" validations={2} visit={false}/>
        
        <ReccomendationPost name="AKKD Knkndda" visit={false}/>

        <br></br>
        <ReccomendationPost name="Thushani Jayasekera" image="null"/>
        <br></br>
        <Reccomendation postedBy="Thshhshs" postedImage="null" reccomendation="very gooddd fkejfkjfk mfsfmsfm smfs,fm"/>
        <br></br>
        <Connections name="Thushani Jayasekera" image="null"/>
        <br></br>
        <Connections name="Laksks Ramannsns" image="null"/>
        <br></br>
        
        <LoginScreen/>
        <br/>
        
        <br></br>
        <SignInScreen/>
        <br></br>

      </header>
    </div>
  );
}

export default App;
