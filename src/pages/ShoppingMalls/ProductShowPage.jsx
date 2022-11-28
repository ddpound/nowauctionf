import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { Viewer } from "@toast-ui/react-editor";

import ProductRegistrationWrite from "../ProductRegistration/pages/ProductRegistrationWrite";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

/**
 * 유저와 관리자등 모두가 볼수있는 제품 뷰 페이지
 * 이미 완성된 제품 객체를 받으니 수정 onSubmit만 있으면될듯
 */
export default function ProductShowPage(props) {
  const productId = props.match.params.id;

  const [product, setProduct] = useState(...[]);

  /**
   * declare 선언하다
   * @param modifyDeclare
   * 수정을 선언했을때 바꿔준다 수정문으로
   * 처음에는 수정이 아니니 수정상태가 아님
   */
  const [modifyDeclare, setModifyDeclare] = useState(false);

  const sellerIn = localStorage.getItem("sellerSuccess");
  const adminIn = localStorage.getItem("adminSuccess", "imadmin");
  useEffect(() => {
    axios
      .get("/auction-seller/auth/show-shoppingmall/product-show/" + productId)
      .then((res) => {
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
      {((!!sellerIn && !modifyDeclare) || !!adminIn) && (
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          제품 삭제하기
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
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    옵션
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">옵션1 입니다.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    옵션 2
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">옵션2입니다.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    옵션 3
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">옵션 3 입니다.</div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <button type="button" className="btn btn-dark">
                구매 예약
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                삭제하기
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              정말 제품을 삭제하시겠습니까? <br />
              삭제한 제품은 다시 복구할수 없습니다.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  requestDeleteHaveToken(
                    "/auction-seller/seller/delete-product/" + product.id,
                    props
                  )
                    .then((res) => {
                      alert("삭제에 성공하셨습니다.");
                      props.history.push("/");
                    })
                    .catch((Error) => {
                      alert("삭제에 실패했습니다.");
                    });
                }}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
