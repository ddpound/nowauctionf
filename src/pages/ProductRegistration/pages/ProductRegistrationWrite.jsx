import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// 썸네일 사진 최대3장
// 글 작성 사진 최대 10장

import { requestPostHaveToken } from "../../../commonFuntions/requestHaveToken";

import SunEditorComponent from "../../../components/SunEditor/SunEditorComponent";

// Page입니다.
export default function ProductRegistrationWrite(props) {
  const initialContent = "제품 설명을 작성해주세요 사진은 최대 10장입니다.";
  const onSubmit = (
    content,
    files,
    productname,
    productprice,
    productquantity
  ) => {
    const formData = new FormData();

    console.log("Submitted Content", productname);
    console.log("Submitted Content", productprice);
    console.log("Submitted Content", files);
    console.log("Submitted Content", content);

    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productquantity", productquantity);
    formData.append("content", content);
    formData.append("thumbnail1", files[0]);
    formData.append("thumbnail2", files[1]);
    formData.append("thumbnail3", files[2]);

    const rqPhT = requestPostHaveToken("/seller/save-product", props, formData);

    rqPhT
      .then(() => {
        alert("제품등록에 성공하셨습니다.");
      })
      .catch((Error) => {
        console.log(Error);
      });

    // 여기서 세이브 진행하면 될듯
  };

  return (
    <div className="App">
      <SunEditorComponent
        initialContent={initialContent}
        onSubmit={onSubmit}
        title="제품등록"
      />
    </div>
  );
}
