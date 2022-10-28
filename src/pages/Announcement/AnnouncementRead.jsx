import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BoardBlock from "./AnnouncementComponents/BoardBlock";
import {
  requestGetHaveToken,
  requestDeleteHaveToken,
  requestPostHaveToken,
} from "../../commonFuntions/requestHaveToken";
import { Editor } from "@toast-ui/react-editor";
import { deleteUserDataToken } from "../../commonFuntions/deleteUserDataToken";
import { resetTokens } from "../../commonFuntions/TokenRelatedFunctions";

import { Viewer } from "@toast-ui/react-editor";

function modifyBoard(title, boardContent, boardid, props) {
  if (!!title && !!boardContent) {
    let formData = {
      id: boardid,
      title: title,
      content: boardContent,
    };

    axios
      .post(
        "/auction-user/admin/save-announcement-board/true",
        JSON.stringify(formData),
        {
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
        alert("수정이 완료되었습니다.");
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

export default function AnnouncementRead(props) {
  const adminIn = localStorage.getItem("adminSuccess", "imadmin");

  const boardid = props.match.params.id;

  const EditorRef = useRef();
  const [board, setboard] = useState({});

  /**
   * declare 선언하다
   * @param modifyDeclare
   * 수정을 선언했을때 바꿔준다 수정문으로
   * 처음에는 수정이 아니니 수정상태가 아님
   * */

  const [modifyDeclare, setModifyDeclare] = useState(false);
  useEffect(() => {
    axios
      .get("/auction-user/auth/find-announcement-board/" + boardid)
      .then((res) => {
        setboard(res.data.value);
      });
  }, []);

  return (
    <div className="container-sm mt-5">
      {!!adminIn && !modifyDeclare && (
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => {
            setModifyDeclare(true);
          }}
        >
          글 수정하기
        </button>
      )}
      {!modifyDeclare && !!adminIn && (
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          글 삭제하기
        </button>
      )}
      {!!board.Content && !modifyDeclare && (
        <div>
          <div className="card mb-3">
            <div className="card-header bg-transparent ">
              <h2 style={{ fontWeight: "bold" }}>{board.title}</h2>
            </div>
            <div className="card-body text-dark">
              <Viewer initialValue={board.Content}></Viewer>
            </div>
            <div className="card-footer bg-transparent">{board.createDate}</div>
          </div>
        </div>
      )}

      {!!board.Content && modifyDeclare && !!adminIn && (
        <div>
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
                defaultValue={!!board ? board.title : ""}
              />
            </div>
          </div>
          <Editor
            ref={EditorRef}
            previewStyle="vertical"
            initialValue={board.Content}
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

                modifyBoard(title, content, boardid, props);
              }}
              type="button"
              className="btn btn-dark"
            >
              글수정하기
            </button>
          </div>
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                삭제하기
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              정말 글을 삭제하시겠습니까? <br />
              삭제한 글은 다시 되돌리지 못합니다!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  requestDeleteHaveToken(
                    "/auction-user/admin/delete-announcement-board/" + boardid,
                    props
                  )
                    .then((res) => {
                      alert("삭제에 성공하셨습니다.");
                      props.history.push("/");
                    })
                    .catch((Error) => {
                      alert("삭제에 실패했습니다.");
                    });
                }}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
