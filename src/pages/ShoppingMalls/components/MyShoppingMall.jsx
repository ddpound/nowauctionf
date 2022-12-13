import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import NewMakeShoppingMall from "./NewMakeShoppingMall";

import ProductRegistrationMain from "../../ProductRegistration/ProductRegistrationMain";
export default function MyShoppingMall({ props, data }) {
  return (
    <div className="container mt-5">
      <h3>{data.shoppingMallName}</h3>
      <NewMakeShoppingMall props={props} inData={data} />
      <ProductRegistrationMain props={props} inData={data} />
    </div>
  );
}
