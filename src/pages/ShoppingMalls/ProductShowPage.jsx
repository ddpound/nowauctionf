import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { Viewer } from "@toast-ui/react-editor";

import ProductRegistrationWrite from "../ProductRegistration/pages/ProductRegistrationWrite";

import {
  requestPostHaveToken,
  requestGetHaveToken,
} from "../../commonFuntions/requestHaveToken";

/**
 * 유저와 관리자등 모두가 볼수있는 제품 뷰 페이지
 * 이미 완성된 제품 객체를 받으니 수정 onSubmit만 있으면될듯
 */
export default function ProductShowPage(props) {
  const productId = props.match.params.id;

  const [product, setProduct] = useState(...[]);

  const onSubmit = (
    content,
    files,
    productname,
    productprice,
    productquantity,
    productId
  ) => {
    console.log(productId);
    const formData = new FormData();

    //수정 작업이니깐 files는 없다면 빼도 됨
    if (!!files) {
      formData.append("thumbnail1", files[0]);
      formData.append("thumbnail2", files[1]);
      formData.append("thumbnail3", files[2]);
    }

    // 꼭 ID도 넣어줘야함
    formData.append("ProductID", productId);

    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productquantity", productquantity);
    formData.append("content", content);

    const requestUrl = "/seller/save-product/true";
    const rqPhT = requestPostHaveToken(requestUrl, props, formData)
      .then(() => {
        alert("수정이 완료되었습니다.");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  /**
   * declare 선언하다
   * @param modifyDeclare
   * 수정을 선언했을때 바꿔준다 수정문으로
   * 처음에는 수정이 아니니 수정상태가 아님
   */
  const [modifyDeclare, setModifyDeclare] = useState(false);

  const sellerIn = localStorage.getItem("sellerSuccess", "sellerSuccess");

  useEffect(() => {
    axios.get("/show-shoppingmall/product-show/" + productId).then((res) => {
      setProduct(res.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      {!sellerIn && (
        <button
          className="btn btn-dark"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          구매 예약하기
        </button>
      )}
      {!!sellerIn && !modifyDeclare && (
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => {
            setModifyDeclare(true);
          }}
        >
          제품수정하기
        </button>
      )}
      {!!sellerIn && modifyDeclare && (
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => {
            setModifyDeclare(false);
          }}
        >
          제품보기로 돌아가기
        </button>
      )}
      {/* 제품이 있으며 수정선언이 거짓일때, 역이니 진실 */}
      {!!product && !modifyDeclare && (
        <div className="card mb-3 mt-3">
          <div className="card-header bg-transparent ">
            <h1 style={{ fontWeight: "bold" }}>{product.productName}</h1>
            <h2>가격 : {product.productPrice}</h2>
            <h2>수량 : {product.productQuantity}</h2>
          </div>

          <div className="card-body text-dark">
            <Viewer initialValue={product.content}></Viewer>
          </div>
          <div className="card-footer bg-transparent">{product.createDate}</div>
        </div>
      )}

      {modifyDeclare && (
        <ProductRegistrationWrite
          props={props}
          history={props.history}
          InModify={true}
          product={product}
          onSubmit={onSubmit}
        />
      )}

      {!!product && (
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">{product.productName}</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>
              <p>제품 설명</p>
              <p>가격 : {product.productPrice}</p>
              <p>수량 : {product.productQuantity}</p>
            </div>
            <hr />
            <label htmlFor="basic-url" className="form-label">
              구매 할 수량
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              />
            </div>
            <div>
              <button type="button" className="btn btn-dark">
                구매 예약
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
