import './App.css';
import Index from './pages/Index';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Qnaboardmain from './pages/Qnaboardmain';
import BoardPage from './pages/BoardPage'
import Footer from './components/footerandheader/Footer';
import Header from './components/footerandheader/Header';
import ChatRoom from './pages/ChatRoom';
import LoginTryPage from './pages/LoginTryPage';
import UserInfoPage from './pages/UserInfo/UserInfoPage';
import AdminInPage from './pages/AdminPages/AdminInPage';


import PrivateRoute from './components/authorizeRoute/PrivateRoute';
import PublicRoute from './components/authorizeRoute/PublicRoute';
import AdminRoute from './components/authorizeRoute/AdminRoute';
import SellerRoute from './components/authorizeRoute/SellerRoute';

import NotFoundPage from './pages/notFound/NotFoundPage';
import MainAdminPage from './pages/AdminPages/MainAdminPage';

import MainAnnouncement from './pages/Announcement/MainAnnouncement';

import AdminWritePageAnnouncement from './pages/Announcement/AdminWritePageAnnouncement';
import AnnouncementRead from './pages/Announcement/AnnouncementRead';

import MainShoppingMallPage from './pages/ShoppingMalls/MyShoppingMallPage';

function App() {
  

  return (
    <BrowserRouter>
    <Route path="/" component = {Header} />
    <Switch>
    
    <PrivateRoute  path="/user-info" exact component={UserInfoPage}/>
    
    <PrivateRoute  path="/admin-page-try/:password" exact component={AdminInPage}/>
    
    {/* 공지글쓰기 (관리자만 해당)*/}
    <AdminRoute path="/announcement-write" exact component={AdminWritePageAnnouncement} />

    <AdminRoute  path="/admin-page/" exact component={MainAdminPage}/>

    <SellerRoute  path="/my-shoppingmall-page" exact component={MainShoppingMallPage}/>

    <PublicRoute path="/profile" exact component={Profile} />
    
    <PublicRoute path="/qnaboard-main" exact component={Qnaboardmain} />
    
    {/* 공지 */}
    <PublicRoute path="/announcement-main" exact component={MainAnnouncement}/>

    <PublicRoute path="/announcement/:id" exact component={AnnouncementRead}/>

    <PublicRoute path="/board/:id" exact component={BoardPage} />
    
    <PublicRoute path="/chat-room/:id" exact component={ChatRoom} />

    <PublicRoute restricted  path="/login-page" exact component={LoginTryPage} />
    
    

    <PublicRoute path="/" exact component={Index} />

    <PublicRoute component={NotFoundPage} />
    
    
    
    </Switch>

    <Route path="/" component = {Footer} />
    
    </BrowserRouter>
  );
}

export default App;
