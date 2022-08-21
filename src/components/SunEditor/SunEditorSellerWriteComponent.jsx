import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

export default function SunEditorSellerWriteComponent({
  initialContent = "",
  title,
  onSubmit,
}) {
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
          제목
        </span>
        <input
          id="title"
          type="text"
          className="form-control"
          placeholder="제목이름을 입력해주세요"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="formFileMultiple" className="form-label">
          썸네일이 없거나 글에 사진이 없다면 기본 썸네일로 지정됩니다.
        </label>
        <input className="form-control" type="file" id="formFileMultiple" />
      </div>

      <label className="form-label">
        <h3>글에 들어가는 사진은 최대 10장입니다.</h3>
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
        placeholder={"글을 작성해주세요"}
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
            const productname = document.getElementById("title").value;

            onSubmit(content, files, productname);
          }}
        >
          작성하기
        </button>
      </div>
    </div>
  );
}
