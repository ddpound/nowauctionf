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

export default function UserInfoPage(props) {
  const [userobject, setUserOb] = useState({
    id: "",
    userName: "",
    nickName: "",
    role: "",
    picture: "",
  });

  useEffect(() => {
    const returnResponse = requestGetHaveToken(
      "/auction-user/user/info",
      props
    );

    returnResponse
      .then((responese) => {
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

  return (
    <div className="container mt-5 ">
      <div className="card" style={{ width: "28rem", margin: "auto" }}>
        <img className="card-img-top" src={userobject.picture} alt="" />
        <div className="card-body">
          <h5 className="card-title">{userobject.userName}</h5>
          <p className="card-text">{userobject.nickName}</p>
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
    </div>
  );
}

//const loginInfo = cookies.load("google-login-success");
// 훅 사용하려면 즉 useState사용하려면 함수가 대문자여야함
