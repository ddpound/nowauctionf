import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './reduxstore/store'

import { Provider } from 'react-redux';

// <React.StrictMode> 사용하는 이유는 개발자 모드에서의 생명주기 체크등의
// 다양한 에러방지를 사전방지를위해 두었습니다.
// 덕분에 모든 프로그램을 실행할때 두번씩 실행합니다
//개발이아닌 배포때는 없어질 예정


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App/>
  </Provider>
  //</React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
