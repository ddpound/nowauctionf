import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { Link } from "react-router-dom";

import { requestGetHaveToken } from "../../../commonFuntions/requestHaveToken";
import ShoppingMallBlockComponent from "../NowShoppingMallListComponents/ShppingMallBlockComponent";
import ShoppingMallBlockComponentContainer from "../NowShoppingMallListComponents/ShoppingMallBlockComponentContainer";

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
    <div className="container mt-5">
      {
        <ShoppingMallBlockComponentContainer
          onePagePostNumber={10}
          inPosts={shoppingMallList}
        />
      }
    </div>
  );
}
