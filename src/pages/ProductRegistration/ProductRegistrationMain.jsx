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

function registerChatRoom(props) {
  var formData = new FormData();

  const chatRoomTitle = document.getElementById("chatRoomTitle").value;

  formData.append("chatRoomTitle", chatRoomTitle);

  const requestProduct = requestPostHaveToken(
    "/seller/register-chatroom",
    props,
    formData
  );

  requestProduct
    .then(() => {
      alert("경매를 시작합니다.");
    })
    .catch((e) => {
      console.log(e);
    });
}

export default function ProductRegistrationMain({ props }) {
  return (
    <div className="container">
      <div className="accordion mt-5" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              제품 등록하기
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
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
                <label htmlFor="ProductQuantity" className="form-label">
                  수량
                </label>

                <input type="text" className="form-control" id="productPrice" />
                <div id="emailHelp" className="form-text">
                  판매 수량을 입력하지 않았을 경우에는 1개입니다.
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-check-input"
                  id="exampleCheck1"
                />
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
            </div>
          </div>
        </div>

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
