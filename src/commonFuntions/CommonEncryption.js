var CryptoJS = require("crypto-js");

const key = process.env.REACT_APP_local_encryption_key;



export const creationData = (data,dataname)=>{

    var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    
    localStorage.setItem(dataname, encryptedData);
}


export const returnDATA = (dataname)=>{

    console.log('테스트 dataname');
    console.log(dataname);

    // 저장된 데이터 가져오기
    const storedData = localStorage.getItem(dataname);

    if(!!storedData){

        // 데이터 복호화
        const bytes = CryptoJS.AES.decrypt(storedData, key);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log('테스트');
        console.log(decryptedData);
    
        return decryptedData;
    }

    return null;
}


