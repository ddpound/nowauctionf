import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle";
import { useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
import { resetTokens } from "../../commonFuntions/TokenRelatedFunctions";

import CouponListComponent from "./CouponListComponent";

function makeCouponRequest(couponnum) {
  var requestcouponurl = "/admin/make-coupon";

  // 값이 있을때
  if (!!couponnum) {
    requestcouponurl = "/admin/make-coupon?couponNumber=" + couponnum;
  }

  axios
    .post(requestcouponurl, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("google-login-success"),
        Refreshtoken:
          "Bearer " + localStorage.getItem("google-login-success-re"),
      },
    })
    .then((response) => {
      resetTokens(response);
      console.log(response);

      alert("쿠폰 생성완료");
      document.location.reload();
    });
}

export default function CouponComponent() {
  return (
    <div className="container mt-5">
      <span className="input-group-text" id="inputGroup-sizing-sm">
        쿠폰 갯수
      </span>
      <input
        id="couponInputNum"
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
      <button
        onClick={() => {
          const couponnum = document.getElementById("couponInputNum").value;
          makeCouponRequest(couponnum);
        }}
        className="btn btn-primary"
      >
        쿠폰생성
      </button>

      <CouponListComponent />
    </div>
  );
}
