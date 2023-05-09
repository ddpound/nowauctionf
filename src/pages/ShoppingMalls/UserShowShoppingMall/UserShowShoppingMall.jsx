import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

// 해당 쇼핑몰의 제품 리스트 부분
import ShoppingMallProductList from "./ShoppingMallProductList";
import { requestGetHaveToken } from "../../../commonFuntions/requestHaveToken";
// 중간에 공지도 넣어야함

// 쇼핑몰 설명 부분
import ShoppingMallExplanation from "./ShoppingMallExplanation";

// 판매자의 게시글 페이지
import SellerBoardListPage from "../SellerBoard/SellerBoardListPage";

import "./UserShowShoppingMall.scss";

import {
  DataNames,
  DNReturn,
  returnDATA,
} from "../../../commonFuntions/CommonEncryption";

/**
 * 해당 컴포넌트는 Page용도입니다.
 * 모든 사용자가 접근 가능합니다. public
 * 게시판만 보기, 제품과 설명보기, 둘다 보기가 가능하도록 설계합니다.
 * */
export default function UserShowShoppingMall(props) {
  const mallId = props.match.params.id;

  const dn = new DataNames();

  const userdata = returnDATA(dn.getLocalUserDataName());

  const [shoppingMall, setShoppingMall] = useState("");

  /**
   * 1은 제품 쇼핑몰설명
   * 2는 게시판보기
   * 3은 모두 한꺼번에 보기
   */
  const [viewNumber, setViewNumber] = useState(1);

  useEffect(() => {
    axios
      .get("auction-seller/auth/show-shoppingmall?id=" + mallId)
      .then((res) => {
        console.log(res);
        setShoppingMall(res.data);
      });
  }, []);

  return (
    <div className="container mt-5">
      <p className="h1 text-center" style={{ fontSize: "72px" }}>
        {shoppingMall.shoppingMallName}
      </p>
      <div
        className="btn-group title-under-div"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <div>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            onClick={() => {
              setViewNumber(1);
            }}
          />
          <label
            className="btn btn-outline-warning btn-dark"
            htmlFor="btnradio1"
          >
            제품,쇼핑몰설명
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            onClick={() => {
              setViewNumber(2);
            }}
          />
          <label
            className="btn btn-outline-warning btn-dark"
            htmlFor="btnradio2"
          >
            게시판보기
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            autoComplete="off"
            onClick={() => {
              setViewNumber(3);
            }}
          />
          <label
            className="btn btn-outline-warning btn-dark"
            htmlFor="btnradio3"
          >
            모두 보기
          </label>
        </div>
        {!!userdata && userdata.role === "USER" && (
          <div>
            <button
              className="sub-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#SubscriberModalLabel"
            >
              회원 신청하기
            </button>
          </div>
        )}
      </div>

      {(viewNumber == 1 || viewNumber == 3) && (
        <ShoppingMallExplanation shoppingmall={shoppingMall} />
      )}

      {/*제품 리스트 */}

      {(viewNumber == 1 || viewNumber == 3) && (
        <ShoppingMallProductList mallId={mallId} onePagePostNumber={9} />
      )}
      <hr />

      {(viewNumber == 2 || viewNumber == 3) && (
        <SellerBoardListPage onePagePostNumber={9} mallId={mallId} />
      )}

      <div
        className="modal fade"
        id="SubscriberModalLabel"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                회원 등록 신청 메세지 보내기
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                비고
              </span>
              <input
                id="inputCode"
                type="text"
                placeholder="빈칸으로 보내셔도 상관없습니다. 하고싶은말을 적어주세요"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button
                onClick={() => {}}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
