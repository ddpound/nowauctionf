import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { Link } from "react-router-dom";

import { requestPostHaveToken } from "../../../commonFuntions/requestHaveToken";

function addShoppingmall(props, modify) {
  var formData = new FormData(); // 객체 생성

  const shoppingMallName = document.getElementById("shoppingMallName").value;

  const inputFile = document.getElementById("inputGroupFile01").files[0];
  // 수정할때는 url로 받아옴
  const inputFile2 = document.getElementById("inputGroupFile02").value;

  const explantion = document.getElementById("shoppingMallExplanation").value;

  let reqyestUrl = "/auction-seller/seller/make-shopping-mall";

  // modify 가 참이라면 수정이니깐
  if (modify) {
    reqyestUrl = "/auction-seller/seller/modify-shopping-mall";
  }

  // 즉 inputFile, inputFile2 둘중하나만 채워넣으면 된다 이거임
  if (!!shoppingMallName && (!!inputFile || !!inputFile2)) {
    if (shoppingMallName.length > 12) {
      alert("쇼핑몰 이름길이가 너무 깁니다 12자 이내로 써주세요");
    } else {
      formData.append("shoppingMallName", shoppingMallName);

      // inputFile이 null이 아니라면
      if (!!inputFile) {
        formData.append("thumbnail", inputFile);
      } else {
        formData.append("thumbnail2", inputFile2);
      }

      formData.append("explantion", explantion);

      const requestAddShop = requestPostHaveToken(reqyestUrl, "", formData);
      requestAddShop.then(() => {
        alert("등록을 완료했습니다.");
        props.history.push("/");
      });
    }
  } else {
    alert("모든 항목을 입력해주세요");
  }
}

export default function NewMakeShoppingMall({ props, inData }) {
  // true일때 수정 , false일때는 처음 추가
  const [data, setData] = useState(inData);

  const [imagefile, setImageFile] = useState("");

  let [addOrModifyButtonValue, setAddOrModifyButtonValue] = useState("등록");

  const onLoadFile = (e) => {
    const file = e.target.files;

    setImageFile(file);
  };

  useEffect(() => {
    preview();

    return () => preview();
  });

  useEffect(() => {
    // console.log("newMake 안 데이터");

    // data && console.log(data); // 적극활용

    data &&
      (document.getElementById("shoppingMallName").value =
        data.shoppingMallName);

    data &&
      (document.getElementById("shoppingMallExplanation").value =
        data.shppingMallExplanation);
    data &&
      (document.querySelector(
        ".img-thumbnail"
      ).style.backgroundImage = `url(${data.thumnail})`);

    data && (document.getElementById("inputGroupFile02").value = data.thumnail);

    data && setAddOrModifyButtonValue("수정하기");
  }, [data]);

  const preview = () => {
    if (!imagefile) return false;

    const imgEl = document.querySelector(".img-thumbnail");
    const reader = new FileReader();

    reader.onload = () => {
      imgEl.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(imagefile[0]);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <div
            className="img-thumbnail"
            style={{
              backgroundSize: "cover",
              width: 350,
              height: 350,
              border: "2px black solid",
            }}
            id="imageBox"
          ></div>
        </div>
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              쇼핑몰이름
            </span>
            <input
              id="shoppingMallName"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              설명
            </span>
            <input
              id="shoppingMallExplanation"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupFile01">
              썸네일
            </label>
            <input
              type="file"
              className="form-control"
              onChange={onLoadFile}
              id="inputGroupFile01"
            />
          </div>
          <input type="hidden" className="form-control" id="inputGroupFile02" />
          <p>
            썸네일이 없으시면 기본 썸네일로 자동선택되며 나중에 수정하실수
            있습니다.
          </p>
          <button
            id="addOrModifyButton"
            onClick={() => {
              //데이터가 없을때
              !data && addShoppingmall(props, false);
              data && addShoppingmall(props, true);
            }}
            className="btn btn-dark"
          >
            {addOrModifyButtonValue}
          </button>
        </div>
      </div>
    </div>
  );
}
