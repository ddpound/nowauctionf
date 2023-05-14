import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './reduxstore/store'

import axios from 'axios';

import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

// <React.StrictMode> 사용하는 이유는 개발자 모드에서의 생명주기 체크등의
// 다양한 에러방지를 사전방지를위해 두었습니다.
// 덕분에 모든 프로그램을 실행할때 두번씩 실행합니다
//개발이아닌 배포때는 없어질 예정

const userAgent = window.navigator.userAgent;
const isWindows = userAgent.indexOf('Win') !== -1;
const isWindows64 = isWindows && userAgent.indexOf('Win64') !== -1;
const isWindows32 = isWindows && !isWindows64;
const isLinux = userAgent.indexOf('Linux') !== -1;

axios.defaults.baseURL = isWindows64 ? "http://localhost:8000" : isWindows32 ? "http://localhost:8000" : isLinux ? 'https://nowauctiontest.shop' : 'http://localhost:8000';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
  <CookiesProvider> 
    <Provider store={store}>
      <App/>
      </Provider>
  </CookiesProvider>
  //</React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
