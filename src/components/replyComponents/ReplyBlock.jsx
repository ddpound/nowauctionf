import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import ReplyWriteContainer from "./ReplyWriteContainer";
import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

/**
 * 대댓글이 안에있음
 *
 *
 */
const ReplyBlock = ({ reply, userdata }) => {
  const onClickReplyOfReplyWriteEvent = (
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
    console.log(reply.commonModelId);
    console.log("요기요기");
    console.log(reply);
    console.log(reply.id);

    formData.append("content", content);
    formData.append("userId", id);
    formData.append("nickName", nickName);
    formData.append("userPicture", userPicture);
    formData.append("boardId", reply.commonModelId);
    formData.append("replyId", reply.id);

    requestPostHaveToken(
      "/auction-user/user/save-reply/of-reply",
      null,
      formData
    )
      .then((res) => {
        console.log(res);
        alert("댓글을 작성 하셨습니다.");
        document.location.reload();
      })
      .catch((Error) => {
        console.log(Error);
        alert("댓글 작성에 실패하셨습니다.");
      });
  };
  return (
    <div className="container mt-2" key={reply.id}>
      <div className="card border-dark mt-1">
        <div className="card-header d-flex bg-transparent border-dark">
          <div className="col">
            <img
              className="rounded-circle w-25"
              src={reply.userPicture}
              style={{ maxWidth: "30px" }}
              alt=""
            />
            <label className="ms-3">{reply.nickName}</label>
          </div>
          <div className="col-6 justify-content-start">
            <label className="text-end d-block lh-1 mt-1 text-wrap">
              작성 : {reply.createDate}
            </label>
            <label className="text-end d-block lh-1 mt-1 text-wrap">
              수정 : {reply.modifyDate}
            </label>
          </div>
          <div className="col d-flex justify-content-end">
            <button className="btn btn-dark btn-sm">수정하기</button>
            <button className="btn btn-danger btn-sm">삭제</button>
          </div>
        </div>
        <div className="card-body text-dark">
          <p className="card-text">{reply.content}</p>
        </div>
        <div className="card-footer bg-transparent border-dark">
          <ReplyWriteContainer
            boardId={reply.commonModelId}
            userdata={userdata}
            replyId={reply.id}
            onclickEvent={onClickReplyOfReplyWriteEvent}
            setReplyAreaId={"replyOfReply" + reply.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ReplyBlock;
