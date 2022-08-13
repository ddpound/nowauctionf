import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

export default function SunEditorComponent({
  initialContent = "",
  title,
  onSubmit,
}) {
  // sunEditor 의 content를 받아와야함

  const [content, setContent] = useState(initialContent);

  const [files, setFiles] = useState("");

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
      <h2>{title}</h2>
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
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          제품수량
        </span>
        <input
          id="productquantity"
          type="number"
          className="form-control"
          placeholder="제품 수량 입력해주세요"
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
            let files = document.getElementById("formFileMultiple").files;

            console.log(files);
            console.log(files[0]);

            if (files.length > 3) {
              alert("썸네일은 최대 3장입니다.");
              document.getElementById("formFileMultiple").value = "";
            } else {
              // 3장의 썸네일 등록 1 ~ 3 장
              setFiles(files);
            }
          }}
        />
      </div>

      <label className="form-label">
        <h3>설명에 들어가는 사진은 최대 10장입니다.</h3>
      </label>

      <SunEditor
        width="100%"
        height={"1100"}
        onImageUploadBefore={handleImageUploadBefore}
        getSunEditorInstance={getSunEditorInstance}
        autoFocus={true}
        lang={"ko"}
        setContents={initialContent}
        onChange={setContent}
        placeholder={"물건에 대한 설명 사진을 넣어주세요 최대 10장"}
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
      />
      {/* <div>{content}</div> */}
      <div className="d-grid gap-2">
        <button
          className="btn btn-dark"
          onClick={() => {
            const productname = document.getElementById("productname").value;
            const productprice = document.getElementById("productprice").value;
            const productquantity =
              document.getElementById("productquantity").value;

            onSubmit(
              content,
              files,
              productname,
              productprice,
              productquantity
            );
          }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
