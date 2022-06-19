import {createStore} from 'redux';
import {userData} from './reducers'
//첫번째 reducer가 필요함

const store = createStore(userData)


export default store;