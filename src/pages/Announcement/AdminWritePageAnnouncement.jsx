import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";

import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";
import { resetTokens } from "../../commonFuntions/TokenRelatedFunctions";
import { deleteUserDataToken } from "../../commonFuntions/deleteUserDataToken";

function saveBoard(title, boardContent, props) {
  if (!!title && !!boardContent) {
    let formData = {
      title: title,
      content: boardContent,
    };

    axios
      .post(
        "/auction-user/admin/save-announcement-board/false",
        JSON.stringify(formData),
        {
          withCredentials: true,
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("google-login-success"),
            Refreshtoken:
              "Bearer " + localStorage.getItem("google-login-success-re"),
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        alert("작성이 완료되었습니다.");
        resetTokens(res);
        props.history.push("/");
      })
      .catch((Error) => {
        if (Error.response.status == undefined) {
          console.log(Error);
        } else if (Error.response.status == "403") {
          deleteUserDataToken();
          alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");

          if (!!props) {
            props.history.push("/");
          } else {
            document.location.href = "/";
          }
        } else {
          console.log(Error);

          alert("서버에러 다시 로그인해주거나 문의해주세요!");

          if (!!props) {
            props.history.push("/");
          } else {
            document.location.href = "/";
          }
        }
        alert("작성실패 서버확인해주세요");
      });
  } else {
    alert("제목이나 내용을 빠짐없이 넣어주세요");
  }
}

export default function AdminWritePageAnnouncement(props) {
  const EditorRef = useRef();

  return (
    <div className="container mt-5">
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            제 목
          </span>
          <input
            id="boardId"
            type="text"
            className="form-control"
            placeholder="제목을 입력해주세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <Editor
        ref={EditorRef}
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        useCommandShortcut={true}
        // hooks 에서 addImageBlobHook 를 주물러 주면 된다.
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            //console.log(blob); // File {name: '카레유.png', ... }

            var formData = new FormData();

            formData.append("file", blob);
            // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
            // const imgUrl = await .... 서버 전송 / 경로 수신 코드 ...

            requestPostHaveToken(
              "/auction-user/admin/temporary-image-save",
              null,
              formData
            ).then((res) => {
              callback(res.data.url, res.data.responseCode, props);
            });

            // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
            //callback("http://localhost:5000/img/카레유.png", "카레유");
          },
        }}
      />
      <div className="d-grid gap-2">
        <button
          onClick={() => {
            const title = document.getElementById("boardId").value;
            const content = EditorRef.current.getInstance().getMarkdown();

            saveBoard(title, content, props);
          }}
          type="button"
          className="btn btn-dark"
        >
          글작성
        </button>
      </div>
    </div>
  );
}
