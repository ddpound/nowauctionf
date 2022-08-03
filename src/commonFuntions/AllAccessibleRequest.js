// 해당 자바스크립트는 모든 사용자 접근가능하게 만든 function 

import axios from "axios";



export function requestGetNoToken(url){

    return axios.get(url)
}