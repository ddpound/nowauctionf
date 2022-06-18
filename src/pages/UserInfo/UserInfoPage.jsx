import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import "./UserInfoPage.scss";
const loginInfo = localStorage.getItem("google-login-success");
const loginInfoRefresh = localStorage.getItem("google-login-success-re");

function deleteUser() {
  axios
    .get("/user/test1", {
      headers: {
        Authorization: "Bearer " + loginInfo,
        Refreshtoken: "Bearer " + loginInfoRefresh,
      },
    })
    .then((responese) => {
      console.log(responese.data);
    });
}

export default function UserInfoPage() {
  const [userobject, setUserOb] = useState({
    userName: "",
    nickName: "",
    role: "",
    picture: "",
  });

  useEffect(() => {
    if (loginInfo != null) {
      axios
        .get("/user/info", {
          headers: {
            Authorization: "Bearer " + loginInfo,
            Refreshtoken: "Bearer " + loginInfoRefresh,
          },
        })
        .then((responese) => {
          console.log(responese);
          console.log(responese.data);

          //let [userData, userDataFuntion] = responese.data;
          // this.setState({
          //   userName: responese.data.userName,
          //   nickName: responese.data.nickName,
          //   role: responese.data.role,
          // });

          const retrunAuthHeaders = responese.headers.authorization;
          const retrunAuthRefreshHeaders = responese.headers.refreshtoken;

          if (retrunAuthHeaders != null && retrunAuthRefreshHeaders != null) {
            localStorage.setItem(
              "google-login-success",
              retrunAuthHeaders.replace("Bearer ", "")
            );
            localStorage.setItem(
              "google-login-success-re",
              retrunAuthRefreshHeaders.replace("Bearer ", "")
            );
          }

          if (userobject.userName == "") {
            setUserOb((userobject) => {
              return {
                userName: responese.data.userName,
                nickName: responese.data.nickName,
                role: responese.data.role,
                picture: responese.data.picture,
              };
            });
          }
        })
        .catch((Error) => {
          if (Error.response.status == undefined) {
            console.log(Error);
          } else if (Error.response.status == "403") {
            alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");
            document.location.href = "/";
          } else {
            console.log(Error);

            alert("에러발생 로그아웃하고 다시확인해주세요");
            document.location.href = "/";
          }
        });
    } else {
      alert("로그인한 다음에 접근해주세요!");
      document.location.href = "/";
      return;
    }
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
          <p>
            <a href="/give-seller" className="btn btn-dark">
              판매자 권한 신청하기
            </a>
          </p>
          <p>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteUser();
              }}
            >
              회원탈퇴하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

//const loginInfo = cookies.load("google-login-success");
// 훅 사용하려면 즉 useState사용하려면 함수가 대문자여야함
