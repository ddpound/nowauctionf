import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

import { Collapse } from "react-bootstrap";

export default function SunEditorComponent({
  initialContent = "",
  title,
  onSubmit,
  modifyProduct,
}) {
  let slicepath = "";
  let splitThumnail = [];
  if (!!modifyProduct) {
    // ,로 나뉜 썸네일 꺼내기
    slicepath = modifyProduct.pictureUrlPath.slice(0, -1);
    splitThumnail = slicepath.split(",");
  }

  const [modifyThumbnail, setModifyThumbnail] = useState(splitThumnail);

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  /**
   * file값을 받고, 해당 img의 id를 받아내 render해줌
   *
   */
  const encodeFileToBase64 = (fileBlob, id) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);
    return (reader.onload = () => {
      document.getElementById(id).src = reader.result;
    });
  };

  /**
   * 썸네일을 추가했을 때 작동함
   *
   * */
  const [open, setOpen] = useState(false);

  // sunEditor 의 content를 받아와야함
  const [content, setContent] = useState(initialContent);

  /**
   * 썸네일로 사용할 리스트 최대 3개
   */
  const [thumbnaiDivList, setThumbnailDivList] = useState([]);

  const [files, setFiles] = useState("");

  const editor = useRef();

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

  useEffect(() => {
    setOpen(true);
  }, [splitThumnail]);

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
          defaultValue={!!modifyProduct ? modifyProduct.productName : ""}
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
          defaultValue={!!modifyProduct ? modifyProduct.productPrice : 1}
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
          defaultValue={!!modifyProduct ? modifyProduct.productQuantity : 1}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formFileMultiple" className="form-label">
          <p>썸네일 사진은 꼭 넣어주셔야하며 최대 3장 입니다.</p>
          {!!modifyProduct && (
            <p>
              썸네일 수정하실때는 부분 수정이 안되니 한번에 사진을 올려주세요!
            </p>
          )}
        </label>
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={() => {
            let files = document.getElementById("formFileMultiple").files;

            // 먼저 초기화
            setThumbnailDivList([]);

            // 앞서 수정할때 받는 리스트도 초기화가 필수
            setModifyThumbnail([]);

            if (files.length > 3) {
              alert("썸네일은 최대 3장입니다.");
              setOpen(false);
              document.getElementById("formFileMultiple").value = "";
            } else {
              // 썸네일 미리보기하기
              setOpen(true);

              let arr = [];
              for (var i = 0; i < files.length; i++) {
                arr.push(files[i]);
              }

              setThumbnailDivList(arr);

              // 3장의 썸네일 등록 1 ~ 3 장
              setFiles(files);
            }

            if (files.length == 0) {
              setOpen(false);
            }
          }}
        />
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="row">
            {thumbnaiDivList.length > 0 &&
              thumbnaiDivList.map((thumbnail, idx) => {
                return (
                  <div className="col" key={idx}>
                    {thumbnail && (
                      <img
                        className="img-thumbnail"
                        id={"thumbnail-" + idx}
                        style={{ maxHeight: "300px" }}
                        onLoad={encodeFileToBase64(
                          thumbnail,
                          "thumbnail-" + idx
                        )}
                        alt="preview-img"
                      />
                    )}
                  </div>
                );
              })}
          </div>
          {modifyThumbnail.length > 0 && (
            <div className="row">
              {modifyThumbnail.map((thumbnail, idx) => {
                return (
                  <div className="col" key={idx}>
                    <img
                      className="img-thumbnail"
                      id={"thumbnail-" + idx}
                      style={{ maxHeight: "300px" }}
                      src={thumbnail}
                      alt="preview-img"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Collapse>

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
        setContents={!!modifyProduct ? modifyProduct.content : ""}
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
            let productId = 0;
            if (!!modifyProduct) {
              productId = modifyProduct.id;
            }

            onSubmit(
              content,
              files,
              productname,
              productprice,
              productquantity,
              productId
            );
          }}
        >
          {!!modifyProduct ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
