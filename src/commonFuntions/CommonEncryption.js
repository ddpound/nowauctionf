var CryptoJS = require("crypto-js");

const key = process.env.REACT_APP_local_encryption_key;



export const creationData = (data,dataname)=>{

    var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), "11").toString();

    console.log("sss?")
    console.log(dataname)
    
    localStorage.setItem(dataname, encryptedData);
}


export const returnDATA = (dataname)=>{

    // 저장된 데이터 가져오기
    const storedData = localStorage.getItem(dataname);

    // 데이터 복호화
    const bytes = CryptoJS.AES.decrypt(storedData, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}


