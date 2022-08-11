import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// 썸네일 사진 최대3장
// 글 작성 사진 최대 10장

// Page입니다.
export default function ProductRegistrationWrite() {
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    // uploadHandler is a function
    console.log(files, info);
    uploadHandler(files);
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
      />
      <div className="d-grid gap-2">
        <button onClick={() => {}} type="button" className="btn btn-dark">
          제품등록
        </button>
      </div>
    </div>
  );
}
