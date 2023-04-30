var CryptoJS = require("crypto-js");

const key = process.env.REACT_APP_local_encryption_key;

const localUserDataName = process.env.REACT_APP_local_userdata_KEY;
const localadminDataName = process.env.REACT_APP_local_admin_success_KEY;
const localsellerDataName = process.env.REACT_APP_local_seller_success_KEY;

export class DataNames{

    constructor() {
        this.localUserDataName = localUserDataName;
        this.localAdminDataName = localadminDataName;
        this.localSellerDataName = localsellerDataName;
    }

    getLocalUserDataName = ()=>{
        return this.localUserDataName;
    }

    getLocalAdminDataName = ()=>{
        return this.localadminDataName;
    }

    getSellerDataName = ()=>{
        return this.localsellerDataName;
    }
}

export const creationData = (data,dataname)=>{

    var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    
    localStorage.setItem(dataname, encryptedData);
}

export const returnDATA = (dataname)=>{

    // 저장된 데이터 가져오기
    const storedData = localStorage.getItem(dataname);

    if(!!storedData){

        // 데이터 복호화
        const bytes = CryptoJS.AES.decrypt(storedData, key);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
        
        return decryptedData;
    }

    return null;
}


