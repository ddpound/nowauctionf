import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

function registerProduct(props) {
  var formData = new FormData(); // 객체 생성

  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;

  formData.append("productName", productName);
  formData.append("productPrice", productPrice);

  const requestProduct = requestPostHaveToken(
    "/seller/register-product",
    props,
    formData
  );

  requestProduct
    .then(() => {
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
      alert("등록 완료입니다.");
    })
    .catch((e) => {
      console.log(e);
    });
}

export default function ProductRegistrationMain({ props }) {
  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">
          제품 이름
        </label>
        <input
          type="text"
          className="form-control"
          id="productName"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          제품이름과 가격은 반드시 넣어야합니다.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">
          가격
        </label>
        <input type="text" className="form-control" id="productPrice" />
      </div>
      <div className="mb-3">
        <input type="text" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button
        onClick={() => {
          registerProduct(props);
        }}
        className="btn btn-dark"
      >
        등록
      </button>
      <button
        onClick={() => {
          registerProduct(props);
        }}
        className="btn btn-danger"
      >
        경매하기
      </button>
    </div>
  );
}
