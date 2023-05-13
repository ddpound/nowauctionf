import axios from "axios";
import { React, useState, useEffect, useRef, Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import ReplyWriteContainer from "./ReplyWriteContainer";
import {
  requestPostHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import { returnDATA, DataNames } from "../../commonFuntions/CommonEncryption";

/**
 * 대댓글이 안에있음
 *
 *
 */
const ReplyBlock = ({ reply, userdata }) => {
  const [replyOfReply, setReplyOfReply] = useState([]);

  const dn = new DataNames();

  const userdataParse = returnDATA(dn.getLocalUserDataName());

  useEffect(() => {
    setReplyOfReply(reply.commonReplyOfReplyModels);
  }, []);

  const onClickReplyOfReplyWriteEvent = (
    content,
    id,
    nickName,
    userPicture,
    boardId
  ) => {
    const formData = new FormData();

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

  const onClickDelteReply = (url, replyId) => {
    requestDeleteHaveToken(url + replyId)
      .then((res) => {
        console.log(res);
        alert("댓글 삭제에 성공했습니다.");
        document.location.reload();
      })
      .catch((Error) => {
        console.log(Error);
        alert("댓글 삭제에 실패하셨습니다.");
      });
  };

  // console.log("여기 대댓용 콘솔");
  // console.log(replyOfReply);

  return (
    <div className="container mt-2" key={reply.id}>
      <div className="card mt-1 ">
        <div className="card-body text-dark">
          <div className="col">
            <img
              className="rounded-circle w-25"
              src={reply.userPicture}
              style={{ maxWidth: "30px" }}
              alt=""
            />
            <label className="ms-3 d-inline p-2">{reply.nickName}</label>
            <p className="card-text d-inline p-2">
              <small className="text-muted">작성 : {reply.createDate}</small>
            </p>
            <p className="card-text d-inline p-2">
              <small className="text-muted">수정 : {reply.modifyDate}</small>
            </p>
          </div>
          <div className="col mt-3 mb-3">
            <p className="card-text">{reply.content}</p>
          </div>
          {!!userdataParse.id && userdataParse.id == reply.userId && (
            <div className="col d-flex justify-content-end">
              <button className="btn btn-dark btn-sm">수정하기</button>
              <button
                id={reply.id}
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  onClickDelteReply(
                    "/auction-user/user/delete-reply/",
                    reply.id
                  );
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="card-footer bg-transparent">
          <ReplyWriteContainer
            boardId={reply.commonModelId}
            userdata={userdata}
            replyId={reply.id}
            onclickEvent={onClickReplyOfReplyWriteEvent}
            setReplyAreaId={"replyOfReply" + reply.id}
          />
        </div>
        {!!replyOfReply &&
          replyOfReply.reverse().map((replyOfReply) => {
            return (
              <Fragment key={replyOfReply.id}>
                <div
                  key={replyOfReply.id}
                  className="border-dark border-top border-bottom"
                  style={{ paddingLeft: "100px", backgroundColor: "#FBF2EF" }}
                >
                  <div className="mt-3 mb-5 d-flex bg-transparent">
                    <div className="col">
                      <img
                        className="rounded-circle w-25"
                        src={replyOfReply.userPicture}
                        style={{ maxWidth: "30px" }}
                        alt=""
                      />
                      <label className="ms-3">{replyOfReply.nickName}</label>
                    </div>
                    <div className="col-6 justify-content-start">
                      <p className="card-text d-inline p-2">
                        <small className="text-muted">
                          작성 : {replyOfReply.createDate}
                        </small>
                      </p>
                      <p className="card-text d-inline p-2">
                        <small className="text-muted">
                          수정 : {replyOfReply.modifyDate}
                        </small>
                      </p>
                    </div>
                    {!!userdataParse.id &&
                      userdataParse.id == replyOfReply.userId && (
                        <div className="col d-flex justify-content-end">
                          <button className="btn btn-dark btn-sm">
                            수정하기
                          </button>
                          <button
                            id={replyOfReply.id}
                            className="btn btn-danger btn-sm"
                            onClick={(e) => {
                              onClickDelteReply(
                                "/auction-user/user/delete-reply/of-reply/",
                                replyOfReply.id
                              );
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                  </div>
                  <div className="mb-4 text-dark">
                    <p className="card-text">{replyOfReply.content}</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default ReplyBlock;
