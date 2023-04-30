import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { Viewer } from "@toast-ui/react-editor";

import ProductRegistrationWrite from "../ProductRegistration/pages/ProductRegistrationWrite";

import DaumPostcodeEmbed from "react-daum-postcode";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import { returnDATA, DataNames } from "../../commonFuntions/CommonEncryption";

/**
 * 유저와 관리자등 모두가 볼수있는 제품 뷰 페이지
 * 이미 완성된 제품 객체를 받으니 수정 onSubmit만 있으면될듯
 */
export default function ProductShowPage(props) {
  const productId = props.match.params.id;

  const dn = new DataNames();

  const userdata = returnDATA(dn.getLocalUserDataName());

  const [product, setProduct] = useState(...[]);

  const [optionchoiceList, setOptionchoiceList] = useState([]);

  const [buyerQuantity, setBuyerQuantity] = useState(1);

  const addList = (option, optionIdList, setOptionIdList) => {
    let duplication = false;

    optionIdList.map((optionlist) => {
      if (optionlist.id == option.id) {
        duplication = true;
      }
    });

    if (!duplication) {
      setOptionIdList([...optionIdList, option]);
    }
  };

  const deleteList = (option, optionIdList, setOptionIdList) => {
    setOptionIdList(
      optionIdList.filter((listoption) => listoption.id != option.id)
    );
  };

  // 제품, 구매할 수량, 옵션
  const saveReservation = (
    product,
    quantity,
    optionList,
    userData,
    addressData,
    addAddress
  ) => {
    const reservationDetails = {
      productId: product.id,
      quantity: quantity.buyerQuantity,
      shoppingMallId: product.shoppingMall.id,
      buyerId: userData.id,
      buyerNickName: userData.nickName,
      optionList: optionList,
      address: addressData + "," + addAddress,
    };

    const requestSave = requestPostHaveToken(
      "/auction-user/user/save-reservation",
      props,
      reservationDetails
    );

    requestSave
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          alert("구매 예약 완료");
          document.location.reload();
        }
      })
      .catch((Error) => {
        console.log(Error);

        alert("저장 실패, 다시 시도 해주세요");
      });
  };

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

  const onChangeQuantity = (e) => {
    setBuyerQuantity({
      ...buyerQuantity,
      [e.target.name]: Number(e.target.value),
    });
  };

  const [addressData, setAddressData] = useState();
  const [addAddress, setAddAddress] = useState();
  const postCodeStyle = {
    margin: "20px auto",
    width: "300px",
    height: "300px",
    //display: modalState ? 'block' : 'none',
  };
  const onCompletePost = (data) => {
    setAddressData(data.address);
  }; // onCompletePost 함수

  const changeAddAddress = (e) => {
    setAddAddress(e.target.value);
  };

  return (
    <div className="container mt-5">
      {!sellerIn && !!userdata && (
        <button
          className="btn btn-dark"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          onClick={() => {
            requestGetHaveToken("/auction-user/user/check-address", props).then(
              (res) => {
                if (res.data.length > 1) {
                  const dataArray = res.data.split(",");
                  setAddressData(dataArray[0]);
                  setAddAddress(dataArray[1]);
                } else {
                  alert("기본 등록된 주소가 없습니다.");
                }
              }
            );
          }}
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
            <label htmlFor="buy-quantity" className="form-label">
              구매 할 수량
            </label>
            <div className="input-group mb-3">
              <input
                type="number"
                name="buyerQuantity"
                className="form-control"
                id="buy-quantity"
                aria-describedby="basic-addon3"
                onChange={onChangeQuantity}
              />
            </div>
            <p>옵션</p>
            {!!product.productOptionList &&
              product.productOptionList.map((option) => {
                return (
                  <div
                    id={option.id}
                    key={option.id}
                    onClick={(e) => {
                      console.log(optionchoiceList);
                      addList(option, optionchoiceList, setOptionchoiceList);
                    }}
                    className="option-button"
                  >
                    <div className="row">
                      <div className="col">{option.id}. </div>
                      <div className="col">{option.optionTitle}</div>

                      <div className="col">{option.detailedDescription}</div>
                    </div>
                  </div>
                );
              })}
            {optionchoiceList.length > 0 && (
              <div>
                <hr />
                <p>선택된 옵션</p>
                {optionchoiceList.map((option) => {
                  return (
                    <div
                      key={option.id}
                      onClick={() => {
                        deleteList(
                          option,
                          optionchoiceList,
                          setOptionchoiceList
                        );
                      }}
                      className="option-button row"
                    >
                      <div className="col">{option.id}. </div>
                      <div className="col">{option.optionTitle}</div>

                      <div className="col">{option.detailedDescription}</div>
                    </div>
                  );
                })}
              </div>
            )}
            <hr />
            <p>새 주소를 입력하지 않으면 기본주소로 입력됩니다.</p>
            <p>
              <button
                className="btn btn-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                새 주소 입력
              </button>
            </p>
            <div className="collapse" id="collapseExample">
              <DaumPostcodeEmbed
                style={postCodeStyle}
                onComplete={onCompletePost}
              ></DaumPostcodeEmbed>
            </div>
            {!!addressData && (
              <div className="container">
                <div>
                  <label id="address" value={addressData}>
                    {addressData}
                  </label>
                </div>
                <div>
                  <label htmlFor="addAddress">자세한 주소 : </label>
                  <input
                    className="rounded-3 ms-2"
                    id="addAddress"
                    type="text"
                    onChange={changeAddAddress}
                    defaultValue={addAddress}
                  />
                </div>
              </div>
            )}
          </div>

          <hr />
          <div>
            <button
              type="button"
              onClick={() => {
                saveReservation(
                  product,
                  buyerQuantity,
                  optionchoiceList,
                  userdata,
                  addressData,
                  addAddress
                );
              }}
              className="btn btn-dark"
            >
              구매 예약
            </button>
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
