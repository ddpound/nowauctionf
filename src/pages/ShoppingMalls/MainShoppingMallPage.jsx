import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

// 등록한 쇼핑몰이 있는지 확인 있을때는 설정창
// 없을 때는 만드는 페이지

function checkMall() {}

export default function MainShoppingMallPage() {
  axios
    .get("/seller/check-mall", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("google-login-success"),
        Refreshtoken:
          "Bearer " + localStorage.getItem("google-login-success-re"),
      },
    })
    .then((res) => {
      if (!!res.data) {
        return <div>기존에 있던 쇼핑몰과 자료들</div>;
      } else {
        return <div>쇼핑몰 만드는 페이지</div>;
        // 데이터가 없다는것
      }
    });
}
