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

/**
 * 해당 컴포넌트는 Page용도입니다.
 * 모든 사용자가 접근 가능합니다. public
 * 게시판만 보기, 제품과 설명보기, 둘다 보기가 가능하도록 설계합니다.
 * */
export default function UserShowShoppingMall(props) {
  const mallId = props.match.params.id;
  // 쇼핑몰 설명

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
        setShoppingMall(res.data.value);
      });
  }, []);

  return (
    <div className="container mt-5">
      <p className="h1 text-center" style={{ fontSize: "72px" }}>
        {shoppingMall.shoppingMallName}
      </p>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
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
        <label className="btn btn-outline-warning btn-dark" htmlFor="btnradio1">
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
        <label className="btn btn-outline-warning btn-dark" htmlFor="btnradio2">
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
        <label className="btn btn-outline-warning btn-dark" htmlFor="btnradio3">
          모두 보기
        </label>
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
    </div>
  );
}
