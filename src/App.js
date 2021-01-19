
import './App.css';
import LoginScreen from './screens/LoginScreen'
import SignInScreen from './screens/SignInScreen'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginScreen/>
        <br></br>
        <SignInScreen/>
      </header>
    </div>
  );
}

export default App;
