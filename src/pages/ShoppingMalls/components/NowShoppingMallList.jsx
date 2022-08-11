import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { Link } from "react-router-dom";

import { requestGetHaveToken } from "../../../commonFuntions/requestHaveToken";
import ShoppingMallBlockComponent from "../NowShoppingMallListComponents/ShppingMallBlockComponent";
import ShoppingMallBlockComponentContainer from "../NowShoppingMallListComponents/ShoppingMallBlockComponentContainer";

export default function NowShoppingMallList({ props }) {
  return (
    <div className="container mt-5">
      {<ShoppingMallBlockComponentContainer onePagePostNumber={9} />}
    </div>
  );
}
