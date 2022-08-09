import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import MyShoppingMall from "./components/MyShoppingMall";

import NewMakeShoppingMall from "./components/NewMakeShoppingMall";

import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

// 등록한 쇼핑몰이 있는지 확인 있을때는 설정창
// 없을 때는 만드는 페이지

export default function MyShoppingMallPage(props) {
  const [shoppingMalldata, setShoppingMalldata] = useState("");

  useEffect(() => {
    requestGetHaveToken("/seller/check-mall", "").then((res) => {
      setShoppingMalldata(res);
    });
  }, []);

  if (!!shoppingMalldata.data) {
    return <MyShoppingMall props={props} data={shoppingMalldata.data} />;
  } else {
    return <NewMakeShoppingMall props={props} inData={null} />;
    // 데이터가 없다는것
  }
}
