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

// 제품 작성
import ProductRegistrationWrite from './pages/ProductRegistration/pages/ProductRegistrationWrite';

// 쇼핑몰 보기
import UserShowShoppingMall from './pages/ShoppingMalls/UserShowShoppingMall/UserShowShoppingMall';

// 쇼핑몰 작성
import PageShoppingMallWrite from './pages/ShoppingMalls/ShoppingMallWrite/PageShoppingMallWrite';

// 제품보기
import ProductShowPage from './pages/ShoppingMalls/ProductShowPage';

// 판매자의 글 보기
import SellerBoardShowPage from './pages/ShoppingMalls/SellerBoard/SellerBoardShowPage'

// 판매자 제품 판매 관리 페이지
import SellerPurcheseMgtMain from './pages/SellerPurcheseMgtMain/SellerPurcheseMgtMain'

// 판매자 제품판매 관리 페이지 -> 휴지통
import RecycleBin from './pages/SellerPurcheseMgtMain/RecycleBin';

function App() {

  return (
    <BrowserRouter>
    <Route path="/" component = {Header} />
    <Switch>
    
    <PrivateRoute  path="/user-info" exact component={UserInfoPage}/>
    
    <PrivateRoute  path="/admin-page-try/:password" exact component={AdminInPage}/>
    
    {/* 공지글쓰기 (관리자만 해당)*/}
    <AdminRoute path="/announcement-write" exact component={AdminWritePageAnnouncement} />

    <AdminRoute path="/admin-page/" exact component={MainAdminPage}/>

    {/* 내 쇼핑몰 보기 (판매자만 해당)*/}
    <SellerRoute path="/my-shoppingmall-page" exact component={MainShoppingMallPage}/>
    
    {/* 내 쇼핑몰 글쓰기 (판매자만 해당)*/ }
    <SellerRoute path="/seller-write" exact component={PageShoppingMallWrite}/>

    {/* 제품 글쓰기 (판매자만 해당)*/}
    <SellerRoute path="/product-write" exact component={ProductRegistrationWrite}/>

    {/* 판매자의 판매 관리 페이지 (판매자만 해당)*/}
    <SellerRoute path="/seller/product-purchese-mgt-page/:id" exact component={SellerPurcheseMgtMain}/>

    {/* 휴지통 (판매자만 해당)*/}
    <SellerRoute path="/seller/product-purchese-mgt-page/:id/recycle-bin" exact component={RecycleBin}/>

    <PublicRoute path="/profile" exact component={Profile} />
    
    <PublicRoute path="/qnaboard-main" exact component={Qnaboardmain} />
    
    {/* 공지 */}
    <PublicRoute path="/announcement-main" exact component={MainAnnouncement}/>

    <PublicRoute path="/announcement/:id" exact component={AnnouncementRead}/>
     
     {/* 제품 보기 */}
    <PublicRoute path="/product-show/:id" exact component={ProductShowPage}/>

     {/* 쇼핑몰 보기 */}
    <PublicRoute path="/show-shoppingmall/:id" exact component={UserShowShoppingMall}/>
    
    {/* 판매자의 글 보기 */}
    <PublicRoute path="/show-seller-board/:id" exact component={SellerBoardShowPage}/>

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
