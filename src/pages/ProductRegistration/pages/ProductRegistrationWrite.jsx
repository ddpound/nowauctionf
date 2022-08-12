import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// 썸네일 사진 최대3장
// 글 작성 사진 최대 10장

import { requestPostHaveToken } from "../../../commonFuntions/requestHaveToken";

//최대 세장
function thumbnailFileUpload() {
  let fileData = document.getElementById("formFileMultiple").files;

  console.log(fileData);
  console.log(fileData[0]);

  if (fileData.length > 3) {
    alert("썸네일은 최대 3장입니다.");
    document.getElementById("formFileMultiple").value = "";
  }
}

// Page입니다.
export default function ProductRegistrationWrite(props) {
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    // uploadHandler is a function
    console.log(files, info);

    var formData = new FormData();

    formData.append("file", files[0]);

    requestPostHaveToken("/seller/temporary-image-save", null, formData).then(
      (res) => {
        const response = { result: [{ url: res.data.url }] };

        uploadHandler(response);
      }
    );

    //uploadHandler(files);
  };

  return (
    <div className="container mt-5">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          제품이름
        </span>
        <input
          id="productname"
          type="text"
          className="form-control"
          placeholder="제품이름을 입력해주세요"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          제품가격
        </span>
        <input
          id="productprice"
          type="number"
          className="form-control"
          placeholder="제품 가격을 입력해주세요"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formFileMultiple" className="form-label">
          썸네일은 최대 3장 입니다.
        </label>
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={() => {
            thumbnailFileUpload();
          }}
        />
      </div>

      <label className="form-label">
        <h3>설명에 들어가는 사진은 최대 10장입니다.</h3>
      </label>
      <SunEditor
        onImageUploadBefore={handleImageUploadBefore}
        setOptions={{
          height: 200,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],

            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.

            ["fullScreen", "showBlocks"],
            ["preview", "print"],
            ["save"],
            "/", // Line break
            // 여기서 빼놓은거  "template" , "codeView"
          ],
        }}
        plugins={["image"]}
        height={"1100"}
        lang={"ko"}
        getSunEditorInstance={getSunEditorInstance}
        placeholder={"물건에 대한 설명 사진을 넣어주세요 최대 10장"}
      />
      <div className="d-grid gap-2">
        <button onClick={() => {}} type="button" className="btn btn-dark">
          제품등록
        </button>
      </div>
    </div>
  );
}
