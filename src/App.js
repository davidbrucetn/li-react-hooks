import logo from './logo.svg';
import './App.css';

//destructure props to props.name -> name
function App({ name }) {


  return (
    <div className="App">
      <h1>Hello, {name}!</h1>
    </div>
  );
}

export default App;
