import './App.css';
import Index from './pages/Index';
import Profile from './pages/Profile';
import { BrowserRouter, Route } from 'react-router-dom';
import Qnaboardmain from './pages/Qnaboardmain';
import BoardPage from './pages/BoardPage'
import Footer from './components/footerandheader/Footer';
import Header from './components/footerandheader/Header';
import ChatRoom from './pages/ChatRoom';
import LoginTryPage from './pages/LoginTryPage';
import UserInfoPage from './pages/UserInfo/UserInfoPage';



function App() {
  return (
    <BrowserRouter>
    <Route path="/" component = {Header} />

    <Route path="/" exact component = {Index} />
    <Route path="/profile" exact component = {Profile} />
    <Route path="/qnaboardmain" exact component = {Qnaboardmain} />
    <Route path="/board/:id" exact component = {BoardPage} />
    <Route path="/chat-room/:id" exact component={ChatRoom} />

    <Route path="/login-page" exact component={LoginTryPage}/>

    <Route path="/user-info" exact component={UserInfoPage}/>
    
    <Route path="/" component = {Footer} />
    
    </BrowserRouter>
  );
}





export default App;
