import './App.css';
import Index from './pages/Index';
import Profile from './pages/Profile';
import { BrowserRouter, Route } from 'react-router-dom';
import Qnaboardmain from './pages/Qnaboardmain';
import BoardPage from './pages/BoardPage'

function App() {
  return (
    <BrowserRouter>
    <Route path="/" exact component = {Index} />
    <Route path="/profile" exact component = {Profile} />
    <Route path="/qnaboardmain" exact component = {Qnaboardmain} />
    <Route path="/board/:id" exact component = {BoardPage} />
    </BrowserRouter>
  );
}

export default App;
