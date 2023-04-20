import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import "./UserInfoPage.scss";
import { deleteUserDataToken } from "../../commonFuntions/deleteUserDataToken";
import { Link } from "react-router-dom";
import {
  requestGetHaveToken,
  requestPostHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import DaumPostcodeEmbed from "react-daum-postcode";

import {
  returnHeaderTokens,
  resetTokens,
} from "../../commonFuntions/TokenRelatedFunctions";

function deleteUser(props) {
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  if (userdata != null) {
    requestDeleteHaveToken(
      "/auction-user/user/delete/" + userdata.userName,
      props
    ).then((responese) => {
      console.log(responese.data);
      deleteUserDataToken();
      alert("삭제가 완료되었습니다.");
      props.history.push("/");
    });
  }
}

function giveSeller(props, inputid, inputcode, userobject) {
  if (!!inputid && !!inputcode) {
    const giveSellerRe = requestPostHaveToken(
      "/auction-user/give-seller",
      props,
      {
        id: inputid,
        code: inputcode,
      }
    );

    giveSellerRe
      .then((res) => {
        localStorage.setItem("sellerSuccess", userobject.id);
        alert("등록에 성공하셨습니다.");
        props.history.push("/");
      })
      .catch((res) => {
        console.log(res);
        if (res.response.data == "JCODE010") {
          alert("키를 모두 입력하지 않았습니다. 제대로 모두 입력해주세요");
        } else if ((res.response.data = "JCODE800")) {
          alert("1번 키는 숫자입니다. 제대로 모두 입력해주세요");
        } else if (res.response.data == "JCODE001") {
          alert("없는 쿠폰입니다.");
        } else {
          alert("등록 실패, 관리자에게 문의해주세요");
        }
      });
  } else {
    alert("1번, 2번 모두 입력해 주세요!");
  }

  // axios
  //   .post(
  //     "/give-seller",
  //     { id: inputid, code: inputcode },
  //     {
  //       headers: {
  //         Authorization:
  //           "Bearer " + localStorage.getItem("google-login-success"),
  //         Refreshtoken:
  //           "Bearer " + localStorage.getItem("google-login-success-re"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     resetTokens(res);
  //     localStorage.setItem("sellerSuccess", "sellerSuccess");
  //     alert("등록에 성공하셨습니다.");
  //     props.history.push("/");
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //     alert("등록 실패, 관리자에게 문의해주세요");
  //   });
}

const saveAddress = (props, address, addAddress, userobject) => {
  const data = new FormData();
  data.append("address", address);
  data.append("addAddress", addAddress);

  const giveSellerRe = requestPostHaveToken(
    "/auction-user/user/save-address",
    props,
    data
  );
  giveSellerRe
    .then((res) => {
      console.log(res);
      alert("주소저장완료");
      window.location.reload();
    })
    .catch((Error) => {
      console.log(Error);
      alert("주소 저장 실패");
    });
};

export default function UserInfoPage(props) {
  const [userobject, setUserOb] = useState({
    id: "",
    userName: "",
    nickName: "",
    role: "",
    picture: "",
    address: "",
  });

  const [addressData, setAddressData] = useState();

  useEffect(() => {
    const returnResponse = requestGetHaveToken(
      "/auction-user/user/info",
      props
    );

    returnResponse
      .then((responese) => {
        console.log(responese.data);
        if (!!responese) {
          if (responese.data.role == "SELLER") {
            localStorage.setItem("sellerSuccess", responese.data.id);
          }
          //let [userData, userDataFuntion] = responese.data;
          // this.setState({
          //   userName: responese.data.userName,
          //   nickName: responese.data.nickName,
          //   role: responese.data.role,
          // });
          if (userobject.userName == "") {
            setUserOb((userobject) => {
              return {
                id: responese.data.id,
                userName: responese.data.userName,
                nickName: responese.data.nickName,
                role: responese.data.role,
                picture: responese.data.picture,
                address: responese.data.address,
              };
            });
          }
        }
      })
      .catch((Error) => {
        console.log(Error.responese);
        console.log("에러");
      });
  }, []);

  // 스타일 정의 code, (다음 주소입력 디자인)
  const postCodeStyle = {
    width: "400px",
    height: "400px",
    //display: modalState ? 'block' : 'none',
  };

  // 다음 주소 입력후 나오는 div의 디자인
  const insertPostDiv = {};

  const onCompletePost = (data) => {
    setAddressData(data.address);
  }; // onCompletePost 함수

  return (
    <div className="container mt-5 ">
      <div className="card" style={{ width: "28rem", margin: "auto" }}>
        <img className="card-img-top" src={userobject.picture} alt="" />
        <div className="card-body">
          <h5 className="card-title">{userobject.userName}</h5>
          <p className="card-text">{userobject.nickName}</p>
          {!!userobject.address ? (
            <p>{userobject.address}</p>
          ) : (
            <p>등록된 주소가 없습니다.</p>
          )}
          <p className="card-text">
            {userobject.role == "USER" && "회원등급 : 일반유저"}
            {userobject.role == "SELLER" && "회원등급 : 판매자 "}
            {userobject.role == "ADMIN" && "회원등급 : 관리자 "}
          </p>
          {userobject.role == "ADMIN" && (
            <p>
              <Link to="/admin-page" className="btn btn-dark">
                어드민 페이지
              </Link>
            </p>
          )}

          {userobject.role == "USER" && (
            <p>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#sellerModalLabel"
              >
                판매자 등록하기
              </button>
            </p>
          )}

          {userobject.role == "SELLER" && (
            <p>
              <Link className="btn btn-dark" to="/my-shoppingmall-page">
                내 간이 쇼핑몰
              </Link>
            </p>
          )}

          {!!userobject && (
            <p>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#adressModal"
              >
                주소 등록하기
              </button>
            </p>
          )}

          <p>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              탈퇴하기
            </button>
          </p>
        </div>
      </div>

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
                탈퇴하기
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              정말 탈퇴하시겠습니까? <br />
              언제든지 다시 가입이 가능하지만 저장된 정보들이 날아갈수 있습니다.
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
                  deleteUser(props);
                }}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="sellerModalLabel"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                판매자 등록하기
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">번호를 입력해주세요</div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                1번
              </span>
              <input
                id="inputId"
                type="number"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                2번
              </span>
              <input
                id="inputCode"
                type="text"
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
                onClick={() => {
                  const idInput = document.getElementById("inputId").value;
                  const idcodoeInput =
                    document.getElementById("inputCode").value;
                  giveSeller(props, idInput, idcodoeInput, userobject);
                }}
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

      <div
        className="modal fade"
        id="adressModal"
        tabIndex="-1"
        aria-labelledby="adressModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adressModal">
                주소 입력
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">주소 입력</div>
            <DaumPostcodeEmbed
              style={postCodeStyle}
              onComplete={onCompletePost}
            ></DaumPostcodeEmbed>
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
                  />
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  const address1 = addressData;
                  const address2 = document.getElementById("addAddress").value;

                  saveAddress(props, address1, address2, userobject);
                }}
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                주소 저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//const loginInfo = cookies.load("google-login-success");
// 훅 사용하려면 즉 useState사용하려면 함수가 대문자여야함
