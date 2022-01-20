import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Form from './components/Form';

const App = () => (
  <div className="App">
    <Form />
    <TodoList />
    <footer className="App-footer">
      <img src={logo} className="App-logo" alt="logo" />
    </footer>
  </div>
);

export default App;
