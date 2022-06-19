// state의 모습을 구현해야함

// {userName , role, nickName, picture}

import {SET_USER_STORE} from './actions'

// 초기값 형태
const initialSate = {userName : '', role: '', nickName : '', picture : ''};


export function userData(previousState = initialSate, action){

    // 초기값을 설정해주는 부분이며, {} 빈객체를 전달해준다
    // if(previousState == undefined){
    //     return {}; 
    // }

    // 변경되었을때
    if(action.type == SET_USER_STORE){
        // action쪽에 꼭 값 소문자 대문자 구분해주기
        return action.userdata;
    }

    // 아무변화없을때 전 상태를 그냥출력
    return previousState;

}