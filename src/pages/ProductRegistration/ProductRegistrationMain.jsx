import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";
import { Link, useHistory } from "react-router-dom";

function registerProduct(props) {
  var formData = new FormData(); // 객체 생성

  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;

  formData.append("productName", productName);
  formData.append("productPrice", productPrice);

  const requestProduct = requestPostHaveToken(
    "/auction-seller/seller/register-product",
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

export default function ProductRegistrationMain({ props, inData }) {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const goChatRoom = useHistory();

  const registerChatRoom = (props) => {
    let formData = new FormData();

    const chatRoomTitle = document.getElementById("chatRoomTitle").value;

    console.log("유저데이터 닉네임");
    console.log(userdata.nickName);

    formData.append("roomTitle", chatRoomTitle);
    formData.append("sender", userdata.nickName);
    formData.append("chief ", userdata.nickName);
    formData.append("msg", "경매장을 열었습니다.");

    const requestProduct = requestPostHaveToken(
      "/auction-chat/seller/make-room",
      props,
      formData
    );

    requestProduct
      .then((res) => {
        alert("경매를 시작합니다.");
        console.log(res);
        goChatRoom("/chat-room/" + res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("왜 안찍힘?");
    console.log(userdata);
  }, []);

  return (
    <div className="container mt-5">
      <div>
        <Link className="btn btn-dark" to={"/product-write"}>
          제품 등록하러 가기
        </Link>
        <Link className="btn btn-dark ms-3" to={"/seller-write"}>
          글 작성하기
        </Link>

        <Link
          className="btn btn-dark ms-3"
          to={"/seller/product-purchese-mgt-page/" + inData.id}
        >
          제품 예약 목록 페이지
        </Link>
      </div>
      <div className="accordion mt-5" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              실시간 경매 시작하기
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="input-group flex-nowrap">
                <input
                  id="chatRoomTitle"
                  type="text"
                  className="form-control"
                  placeholder="방제"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button
                  onClick={() => {
                    registerChatRoom(props);
                  }}
                  className="btn btn-danger me-md-2 "
                >
                  경매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
