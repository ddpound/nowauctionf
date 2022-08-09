import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import NewMakeShoppingMall from "./NewMakeShoppingMall";

import ProductRegistrationMain from "../../ProductRegistration/ProductRegistrationMain";
export default function MyShoppingMall({ props, data }) {
  console.log(data);
  return (
    <div>
      현재 쇼핑몰
      <NewMakeShoppingMall props={props} inData={data} />
      <ProductRegistrationMain />
    </div>
  );
}
