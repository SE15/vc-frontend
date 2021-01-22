
import './App.css';
import LoginScreen from './screens/LoginScreen'
import SignInScreen from './screens/SignInScreen'

import Skill from './components/Skill';

import NavBar from './components/Navbar';
import Connections from './components/Connection.Component';
import Reccomendations from './components/Reccomendation.Component';
import Skills from './components/Skill.Component';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <br/>

        <Reccomendations name="AKKD Knkndda" visit="false"/>
        <Reccomendations name="Thushani Jayasekera" image="null"/>
        <Connections name="Thushani Jayasekera" image="null"/>
        <br></br>
        <Connections name="Laksks Ramannsns" image="null"/>
        <br></br>
        
        <LoginScreen/>
        <br/>
        <Skills/>
        <br></br>
        <SignInScreen/>
        <br></br>

      </header>
    </div>
  );
}

export default App;
