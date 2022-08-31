import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

import { Form, Collapse, InputGroup, Button } from "react-bootstrap";

// 카테고리 선택할때 이미 있는 카테고리가 있는 걸 보여주며(get요청)
// 다른 카테고리를 만들때는 자동으로 만들게 해줌

export default function SunEditorSellerWriteComponent({
  initialContent = "",
  title,
  onSubmit,
  categoryList,
  setCategoryListCheck,
  board,
}) {
  const [content, setContent] = useState(initialContent);

  const [files, setFiles] = useState("");

  // 현재 셀렉트 카테고리 선택값
  const [categorySelect, setCategorySelect] = useState("");

  // 카테고리를 만들기를 눌렀을때 작동할
  const [open, setOpen] = useState(false);

  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    console.log(files, info);

    var formData = new FormData();

    formData.append("file", files[0]);
    setFiles(files);

    requestPostHaveToken("/seller/temporary-image-save", null, formData).then(
      (res) => {
        const response = { result: [{ url: res.data.url }] };

        uploadHandler(response);
      }
    );

    //uploadHandler(files);
  };

  // 셀렉터의 값이 바뀔때 마다
  // 만약 categoryList.length+1 값을 찍는 다면
  useEffect(() => {
    if (categoryList.length + 1 == categorySelect) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [categorySelect]);

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
          defaultValue={!!board ? board.title : ""}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="thumbnailFile" className="form-label">
          썸네일이 없거나 글에 사진이 없다면 기본 썸네일로 지정됩니다.
        </label>
        <input className="form-control" type="file" id="thumbnailFile" />
      </div>

      <div className="mt-3">
        <label htmlFor="categorySelecter" className="form-label">
          카테고리
        </label>
        <Form.Select
          id="categorySelecter"
          aria-label="Default select example"
          onChange={(e) => {
            return setCategorySelect(e.target.value);
          }}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <option value={0}>기본 카테고리는 공지 입니다.</option>
          {categoryList.length > 0 &&
            categoryList.map((categoryList) => {
              return (
                <option key={categoryList.id} value={categoryList.id}>
                  {categoryList.categoryName}
                </option>
              );
            })}

          <option value={categoryList.length + 1}>카테고리만들기</option>
        </Form.Select>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="추가할 카테고리를 입력해주세요"
                aria-label="Category add"
                aria-describedby="basic-addon2"
                id="inputCategory"
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                  const formData = new FormData();
                  const newCategory =
                    document.getElementById("inputCategory").value;

                  //공백만 입력되었을때
                  var blank_pattern = /^\s+|\s+$/g;

                  // 공백 검사기
                  var blank_pattern = /[\s]/g;

                  if (newCategory.replace(blank_pattern, "") == "") {
                    alert("공백만 입력되었습니다.");
                  } else if (blank_pattern.test(newCategory) == true) {
                    alert("카테고리에 공백은 빼주셔야합니다.");
                  } else {
                    formData.append("categoryName", newCategory);
                    requestPostHaveToken(
                      "/seller/save-category",
                      null,
                      formData
                    ).then(() => {
                      //초기화
                      document.getElementById("inputCategory").value = "";
                      document.getElementById("categorySelecter").value = 0;
                      setOpen(false);
                      setCategoryListCheck(true);
                    });
                  }
                }}
              >
                추가
              </Button>
            </InputGroup>
          </div>
        </Collapse>
      </div>

      <label className="form-label mt-4">
        <h3>글에 들어가는 사진은 최대 10장입니다.</h3>
      </label>

      <SunEditor
        width="100%"
        height={"1100"}
        onImageUploadBefore={handleImageUploadBefore}
        getSunEditorInstance={getSunEditorInstance}
        autoFocus={true}
        lang={"ko"}
        setContents={!!board ? board.Content : ""}
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
            const title = document.getElementById("title").value;
            const category = document.getElementById("categorySelecter").value;
            const files = document.getElementById("thumbnailFile").files;

            onSubmit(content, files, title, category);
          }}
        >
          {!!board ? "작성하기" : "수정하기"}
        </button>
      </div>
    </div>
  );
}
