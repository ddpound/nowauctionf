import axios from "axios";
import { React, useState, useEffect, useRef, Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import Calendar from "react-calendar";

import {
  requestGetHaveToken,
  requestPostHaveToken,
} from "../../commonFuntions/requestHaveToken";

/**
 * 판매자가 구매 예약들의 관리를 해주는
 * 메인 페이지
 * 이름 뜻은 판매자 구매 관리 페이지 (SellerPucheseManegementMain)
 *
 * 검색 (아이디, 키워드{특정단어 검색})
 * 정렬 (가장 최신순, 오래된순, 수량 가장 많은순, 수량 적은순,)
 *
 * @returns 판매자의 구매 관리페이지 리턴
 */
const SellerPurcheseMgtMain = (props) => {
  const shoppingMallId = props.match.params.id;
  const [productReservationList, setProductReservationList] = useState([]);

  const [calendarValue, onChangeCalendar] = useState(new Date());

  const [searchingObject, setSearchingObject] = useState({
    shoppingMallId: 0,
    word: "",
    filter: 0,
  });

  const [searchFilterState, setSearchFilterState] = useState(0);

  const [searchProductState, setSearchProductState] = useState("없음");

  const onChangeSearchObject = (e) => {
    setSearchingObject({
      ...searchingObject,
      [e.target.name]: e.target.value,
      shoppingMallId: shoppingMallId,
    });
  };

  const searchingProductList = (searchingObject) => {
    console.log(searchingObject);
    console.log(searchingObject.filter);
    console.log(searchingObject.word);
    console.log(searchingObject.shoppingMallId);

    const url1 = "?filter=" + searchingObject.filter;
    const url3 = "&shoppingMallId=" + searchingObject.shoppingMallId;
    const url4 = "&searchProductState=" + searchProductState;
    var url2 = "&word=" + searchingObject.word;
    var urlDate1;
    var urlDate2;
    var resulturl;

    if (searchingObject.filter == 3) {
      urlDate1 = "&start=" + toStringByFormatting(calendarValue[0], "-");
      urlDate2 = "&end=" + toStringByFormatting(calendarValue[1], "-");
      url2 = "&word= ";
    } else {
      urlDate1 = "&start=" + toStringByFormatting(new Date(), "-");
      urlDate2 = "&end=" + toStringByFormatting(new Date(), "-");
    }

    resulturl =
      url1 +
      url2 +
      urlDate1 +
      " 00:00:00" +
      urlDate2 +
      " 00:00:00" +
      url4 +
      url3;

    requestGetHaveToken(
      "/auction-seller/seller/search" + resulturl,
      props
    ).then((res) => {
      console.log(res);
      setProductReservationList(res.data);
    });
  };

  useEffect(() => {
    const requestGetProductList = requestGetHaveToken(
      "/auction-seller/seller/find-all-reservation/" + shoppingMallId,
      props
    ).then((res) => {
      console.log(res);
      setProductReservationList(res.data);
    });
  }, []);

  const changeRequestStatus = (productReservation, statusNum) => {
    // 백엔드 -> 없음,판매완료,취소,보류 (0,1,2,3)
    const requestPostStatus = requestPostHaveToken(
      "/auction-seller/seller/change-reservation/" + statusNum,
      props,
      productReservation
    ).then((res) => {
      console.log(res);
      document.location.reload();
    });
  };

  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  };

  const toStringByFormatting = (source, delimiter = "-") => {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  };

  console.log(searchingObject);
  console.log(searchFilterState);
  console.log(calendarValue);
  return (
    <div className="container-fluid">
      <div className="d-flex mt-3 mb-3">
        <div className="float-end w-50">
          <h1>판매자 구매 관리 페이지</h1>
        </div>
        <div className="float-end w-50">
          <button className="btn btn-dark">판매완료통</button>
          <button className="btn btn-dark">휴지통</button>
        </div>
      </div>
      <div>
        <div className="d-flex">
          {searchFilterState < 3 && (
            <input
              name="word"
              className="rounded-3 w-50"
              type="text"
              onChange={(e) => {
                onChangeSearchObject(e);
              }}
            />
          )}

          {searchFilterState == 4 && (
            <select
              className="form-select"
              defaultValue={0}
              aria-label="Default select example"
              onChange={(e) => {
                setSearchProductState(e.target.value);
              }}
            >
              <option value="없음">없음</option>
              <option value="판매완료">판매완료</option>
              <option value="보류">보류</option>
              <option value="취소">취소</option>
            </select>
          )}

          {searchFilterState == 3 && (
            <div>
              <div className="calendar-container">
                <Calendar
                  onChange={onChangeCalendar}
                  value={calendarValue}
                  selectRange={true}
                />
              </div>
              {calendarValue.length > 0 ? (
                <p className="text-center">
                  <span className="bold">시작일: </span>
                  <input
                    type="text"
                    value={toStringByFormatting(calendarValue[0], ".")}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  &nbsp;|&nbsp;
                  <span className="bold">끝: </span>
                  <input
                    type="text"
                    value={toStringByFormatting(calendarValue[1], ".")}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </p>
              ) : (
                <p className="text-center">
                  <span className="bold">Default selected date:</span>
                  {calendarValue.toDateString()}
                </p>
              )}
            </div>
          )}
          <select
            name="filter"
            className="form-select w-25"
            defaultValue={0}
            aria-label="Default select example"
            onChange={(e) => {
              onChangeSearchObject(e);
              setSearchFilterState(e.target.value);
            }}
          >
            <option value={0}>선택안함</option>
            <option value={1}>판매제품</option>
            <option value={2}>구매자</option>
            <option value={3}>구매날짜</option>
            <option value={4}>상태</option>
          </select>
          <button
            className="btn btn-dark"
            onClick={() => {
              searchingProductList(searchingObject);
            }}
          >
            검색
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="idRowCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="idRowCheckBox">
          ID
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="productCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="productCheckBox">
          판매제품
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="buyerCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="buyerCheckBox">
          구매자
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="quantityCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="quantityCheckBox">
          수량
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="buyDateCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="buyDateCheckBox">
          구매날짜
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="addressCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="addressCheckBox">
          주소
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="processingCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="processingCheckBox">
          처리
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="stateCheckBox"
          defaultChecked
        />
        <label className="form-check-label me-2" htmlFor="stateCheckBox">
          상태
        </label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">판매제품(링크)</th>
            <th scope="col">구매자</th>
            <th scope="col">수량</th>
            <th scope="col">구매날짜</th>
            <th scope="col">주소</th>
            <th scope="col">처리</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody>
          {setProductReservationList.length > 0 &&
            productReservationList.map((productReservation) => {
              return (
                <tr key={productReservation.id}>
                  <th scope="row">{productReservation.id}</th>
                  <td>{productReservation.productId.productName}</td>
                  <td>{productReservation.buyerNickName}</td>
                  <td>{productReservation.quantity}</td>
                  <td>{productReservation.createDate}</td>
                  <td>{productReservation.address}</td>
                  <td>
                    <button
                      id={productReservation.id}
                      className="btn btn-dark me-2"
                      onClick={() => {
                        changeRequestStatus(productReservation, 1);
                      }}
                    >
                      판매완료
                    </button>
                    <button
                      id={productReservation.id}
                      className="btn btn-dark me-2"
                      onClick={() => {
                        changeRequestStatus(productReservation, 3);
                      }}
                    >
                      보류
                    </button>
                    <button
                      id={productReservation.id}
                      className="btn btn-dark me-2"
                      onClick={() => {
                        changeRequestStatus(productReservation, 2);
                      }}
                    >
                      취소
                    </button>
                    <button
                      id={productReservation.id}
                      className="btn btn-danger me-2"
                    >
                      삭제
                    </button>
                  </td>
                  <td>{productReservation.reservationStatus}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPurcheseMgtMain;
