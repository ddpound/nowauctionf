import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { Viewer } from "@toast-ui/react-editor";

import PageShoppingMallWrite from "../ShoppingMallWrite/PageShoppingMallWrite";
import ReplyContainer from "../../../components/replyComponents/ReplyContainer";
import ReplyWriteContainer from "../../../components/replyComponents/ReplyWriteContainer";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../../commonFuntions/requestHaveToken";

/**
 * 판매자가 작성한 글을 볼수있는 show page
 * 이미 완성된 제품 객체를 받으니 수정 onSubmit만 있으면될듯
 */
export default function SellerBoardShowPage(props) {
  const boardId = props.match.params.id;

  const [sellerBoard, setSellerBoard] = useState(...[]);

  /**
   * declare 선언하다
   * @param modifyDeclare
   * 수정을 선언했을때 바꿔준다 수정문으로
   * 처음에는 수정이 아니니 수정상태가 아님
   */
  const [modifyDeclare, setModifyDeclare] = useState(false);

  const sellerIn = localStorage.getItem("sellerSuccess");
  const adminIn = localStorage.getItem("adminSuccess");
  const userdata = localStorage.getItem("userdata");

  useEffect(() => {
    axios
      .get("/auction-seller/auth/show-seller-board/" + boardId)
      .then((res) => {
        setSellerBoard(res.data);
        console.log(res.data);
        console.log(res.data.shoppingMall.username);
      });
  }, []);

  console.log("댓글 확인을 위한 보드 log확인");
  console.log(sellerBoard);
  if (!!sellerBoard) {
    console.log();
  }

  const onClickBoardWriteEvent = (
    content,
    id,
    nickName,
    userPicture,
    boardId
  ) => {
    const formData = new FormData();

    console.log(content);
    console.log(id);
    console.log(nickName);
    console.log(boardId);

    formData.append("content", content);
    formData.append("userId", id);
    formData.append("nickName", nickName);
    formData.append("userPicture", userPicture);
    formData.append("boardId", boardId);

    requestPostHaveToken("/auction-user/user/save-reply", null, formData)
      .then((res) => {
        console.log(res);
        alert("댓글작성 성공");
        document.location.reload();
      })
      .catch((Error) => {
        console.log(Error);
        alert("댓글 작성 실패");
      });
  };

  return (
    <div className="container mt-5">
      {!!sellerIn &&
        !!sellerBoard &&
        !modifyDeclare &&
        sellerBoard.shoppingMall.userId == sellerIn && (
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
      {!!sellerIn &&
        !!sellerBoard &&
        !modifyDeclare &&
        sellerBoard.shoppingMall.userId == sellerIn && (
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            글 삭제하기
          </button>
        )}
      {!!adminIn && (
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          글 삭제하기
        </button>
      )}
      {!!sellerIn && modifyDeclare && (
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => {
            setModifyDeclare(false);
          }}
        >
          글보기로 돌아가기
        </button>
      )}
      {/* 제품이 있으며 수정선언이 거짓일때, 역이니 진실 */}
      {!!sellerBoard && !modifyDeclare && (
        <div className="card mb-3 mt-3">
          <div className="card-header bg-transparent ">
            <h1 style={{ fontWeight: "bold" }}>{sellerBoard.title}</h1>
          </div>

          <div className="card-body text-dark">
            <Viewer initialValue={sellerBoard.Content}></Viewer>
          </div>
          <div className="card-footer bg-transparent">
            {sellerBoard.createDate}
          </div>
        </div>
      )}

      {!!userdata && !modifyDeclare && (
        <ReplyWriteContainer
          onclickEvent={onClickBoardWriteEvent}
          userdata={userdata}
          boardId={boardId}
          setReplyAreaId={"reply"}
        />
      )}
      {!!sellerBoard && !modifyDeclare && (
        <ReplyContainer
          inputReplylist={sellerBoard.commonReplyModelList.reverse()}
          userdata={userdata}
        />
      )}

      {modifyDeclare && (
        <PageShoppingMallWrite
          history={props.history}
          InModify={true}
          board={sellerBoard}
        />
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
                    "/auction-seller/seller/delete-seller-board/" +
                      sellerBoard.id,
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
