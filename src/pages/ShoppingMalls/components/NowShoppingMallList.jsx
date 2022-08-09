import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { requestGetHaveToken } from "../../../commonFuntions/requestHaveToken";

export default function NowShoppingMallList({ props }) {
  // 리스트라 의미함
  const [shoppingMallList, setShoppingMallList] = useState([]);
  useEffect(() => {
    const requestList = axios.get("/find-all-shopping-mall");
    requestList.then((res) => {
      setShoppingMallList(res.data.reverse());
    });
  }, []);

  return (
    <div className="container">
      {shoppingMallList.length > 0 &&
        shoppingMallList.map((shoppingMallList) => {
          return (
            <div key={shoppingMallList.id}>
              {shoppingMallList.shoppingMallName}
            </div>
          );
        })}
    </div>
  );
}
