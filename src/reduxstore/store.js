//첫번째 reducer가 필요함
// 버전 4.1.2

import {createStore} from 'redux';
import {userData} from './reducers'


const store = createStore(userData)


export default store;