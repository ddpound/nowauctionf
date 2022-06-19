// 어플리케이션 당 스토어는 하나

// 오타가 나도 방지가능
export const SET_USER_STORE = "SET_USER_STORE";

export function setUserStore(userdata){
    return {
        type : SET_USER_STORE,
        userdata
    }
}