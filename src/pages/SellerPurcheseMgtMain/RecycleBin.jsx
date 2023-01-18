import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import Calendar from "react-calendar";
import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";
import { Link } from "react-router-dom";

const RecycleBin = (props) => {
  const shoppingMallId = props.match.params.id;

  const [recycleList, setRecycleList] = useState([]);

  const [searchFilterState, setSearchFilterState] = useState(0);

  const [searchProductState, setSearchProductState] = useState("없음");

  const [showCheckBox, setShowCheckBox] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

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
      setRecycleList(
        res.data.filter(
          (reservation) => reservation.reservationStatus === "휴지통"
        )
      );
    });
  };

  const [calendarValue, onChangeCalendar] = useState(new Date());

  const [searchingObject, setSearchingObject] = useState({
    shoppingMallId: 0,
    word: "",
    filter: 0,
  });

  const onChangeSearchObject = (e) => {
    setSearchingObject({
      ...searchingObject,
      [e.target.name]: e.target.value,
      shoppingMallId: shoppingMallId,
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

  const setChangeCheckBox = (idx, check) => {
    let checkCopy = [...showCheckBox];
    checkCopy[idx] = check;
    setShowCheckBox(checkCopy);
  };

  const [checkItems, setCheckItems] = useState([]);

  const singleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const allCheck = (checked) => {
    if (checked) {
      const idArray = [];
      recycleList.forEach((el) => {
        idArray.push(el.id);
      });
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const deleteRecycle = (productReservation) => {};

  const deleteRecycleList = (recycleList) => {};

  useEffect(() => {
    const requestGetProductList = requestGetHaveToken(
      "/auction-seller/seller/find-all-reservation/" + shoppingMallId,
      props
    ).then((res) => {
      console.log(res);
      setRecycleList(
        res.data.filter(
          (reservation) => reservation.reservationStatus === "휴지통"
        )
      );
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex mt-3">
        <div className="w-50 mt-3">
          <h1>휴지통</h1>
        </div>
        <div className="float-end w-25">
          <Link
            to={"/seller/product-purchese-mgt-page/" + shoppingMallId}
            className="btn btn-white"
          >
            <img src="/imgs/go-back.png" alt="" />
          </Link>
        </div>
      </div>

      <div className="container-fluid mt-5">
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
        <input
          className="form-check-input"
          type="checkbox"
          value="checkId"
          id="idRowCheckBox"
          defaultChecked
          onChange={(e) => {
            setChangeCheckBox(0, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(1, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(2, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(3, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(4, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(5, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(6, e.target.checked);
          }}
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
          onChange={(e) => {
            setChangeCheckBox(7, e.target.checked);
          }}
        />
        <label className="form-check-label me-2" htmlFor="stateCheckBox">
          상태
        </label>
      </div>
      <div className="mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          style={{ zoom: "1.5" }}
          value=""
          id="allCheck"
          onChange={(e) => {
            allCheck(e.target.checked);
          }}
          checked={checkItems.length === recycleList.length ? true : false}
        />
        <label className="form-check-label me-2" htmlFor="allCheck">
          전체선택
        </label>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteRecycleList(recycleList);
          }}
        >
          선택삭제
        </button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">체크</th>
              {showCheckBox[0] && <th scope="col">id</th>}
              {showCheckBox[1] && <th scope="col">판매제품(링크)</th>}
              {showCheckBox[2] && <th scope="col">구매자</th>}
              {showCheckBox[3] && <th scope="col">수량</th>}
              {showCheckBox[4] && <th scope="col">구매날짜</th>}
              {showCheckBox[5] && <th scope="col">주소</th>}
              {showCheckBox[6] && <th scope="col">처리</th>}
              {showCheckBox[7] && <th scope="col">상태</th>}
            </tr>
          </thead>
          <tbody>
            {recycleList.length > 0 &&
              recycleList.map((productReservation) => {
                return (
                  <tr key={productReservation.id}>
                    <th>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={productReservation.id}
                        style={{ zoom: "1.8" }}
                        checked={
                          checkItems.includes(productReservation.id)
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          singleCheck(e.target.checked, productReservation.id);
                        }}
                      />
                    </th>
                    {showCheckBox[0] && (
                      <th scope="row">{productReservation.id}</th>
                    )}
                    {showCheckBox[1] && (
                      <td>{productReservation.productId.productName}</td>
                    )}
                    {showCheckBox[2] && (
                      <td>{productReservation.buyerNickName}</td>
                    )}
                    {showCheckBox[3] && <td>{productReservation.quantity}</td>}
                    {showCheckBox[4] && (
                      <td>{productReservation.createDate}</td>
                    )}
                    {showCheckBox[5] && <td>{productReservation.address}</td>}
                    {showCheckBox[6] && (
                      <td>
                        <button
                          id={productReservation.id}
                          className="btn btn-danger me-2"
                          onClick={() => {
                            deleteRecycle(productReservation);
                          }}
                        >
                          삭제
                        </button>
                      </td>
                    )}
                    {showCheckBox[7] && (
                      <td>{productReservation.reservationStatus}</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecycleBin;
