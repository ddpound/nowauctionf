import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

function addShoppingmall() {
  var formData = new FormData(); // 객체 생성

  const shoppingMallName = document.getElementById("shoppingMallName").value;

  const inputFile = document.getElementById("inputGroupFile01").files[0];

  const explantion = document.getElementById("shoppingMallExplanation").value;

  if (!!shoppingMallName && !!inputFile) {
    formData.append("shoppingMallName", shoppingMallName);

    formData.append("thumbnail", inputFile);

    formData.append("explantion", explantion);

    axios
      .post("/seller/make-shopping-mall", formData, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("google-login-success"),
          Refreshtoken:
            "Bearer " + localStorage.getItem("google-login-success-re"),
        },
      })
      .then(() => {
        console.log("완료");
      });
  } else {
    alert("모든 항목을 입력해주세요");
  }
}

export default function NewMakeShoppingMall() {
  const [imagefile, setImageFile] = useState("");

  const onLoadFile = (e) => {
    const file = e.target.files;
    setImageFile(file);
  };

  useEffect(() => {
    preview();

    return () => preview();
  });

  const preview = () => {
    if (!imagefile) return false;

    const imgEl = document.querySelector(".imageBox");
    const reader = new FileReader();

    reader.onload = () => {
      imgEl.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(imagefile[0]);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3">
          <div
            className="imageBox"
            style={{
              backgroundSize: "cover",
              width: 300,
              height: 300,
              border: "2px black solid",
            }}
            id="imageBox"
          ></div>
        </div>
        <div className="col-7">
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

          <p>
            썸네일이 없으시면 기본 썸네일로 자동선택되며 나중에 수정하실수
            있습니다.
          </p>
          <button
            onClick={() => {
              addShoppingmall();
            }}
            className="btn btn-dark"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
