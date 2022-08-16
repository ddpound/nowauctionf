import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

import ShoppingMallProductList from "./ShoppingMallProductList";

// 해당 컴포넌트는 Page용도입니다.
export default function UserShowShoppingMall(props) {
  const mallId = props.match.params.id;
  // 쇼핑몰 설명

  return (
    <div>
      {/*제품 리스트 */}
      <ShoppingMallProductList mallId={mallId} />
    </div>
  );
}
