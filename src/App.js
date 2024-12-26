import './App.css';
import LangSwitch from './langagueSwitch/langSwitch';
import Book from './Book/Book'
import { useSelector } from 'react-redux';


function App() {
  const view = useSelector((state) => state.app.mobileView);
  return (
    <div className="App">
      {view? null:<LangSwitch/>}
      <Book/>
    </div>
  );
}

export default App;
