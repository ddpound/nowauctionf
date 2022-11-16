import axios from "axios";
import { React, useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";
/**
 * 1. get요청해서 댓글 리스트를 받아낼 url
 * 2. post요청해서 댓글 작성을 받아낼 url
 * 3. delete 요청해서 삭제할 url
 */

export default function ReplyWriteContainer({
  repleyGetUrl,
  replySavePostUrl,
  boardId,
  userdata,
  onclickEvent,
  replyId,
  setReplyAreaId,
}) {
  // 사용자 입력 저장
  const [checkItemContent, setCheckItemContent] = useState("");
  // 줄바꿈 위치를 저장하는 Dictionary
  const [lineBreakIndexDict, setLineBreakIndexDict] = useState({});
  // 줄 수 (높이)
  const [lineHeight, setLineHeight] = useState(0);

  // 사용자 입력 업데이트 및 줄바꿈 감지
  const checkItemChangeHandler = (event) => {
    setCheckItemContent(event.target.value);

    // Scroll이 생기면 line break
    if (event.target.scrollHeight !== event.target.clientHeight) {
      setLineHeight((prev) => prev + 1); // textarea 높이 늘리고
      setLineBreakIndexDict({
        ...lineBreakIndexDict,
        [event.target.value.length - 1]: 1,
      }); // 줄바꿈 위치 저장
    } else {
      // 다시 줄바꿈 지점으로 오면 line break 취소
      if (lineBreakIndexDict[event.target.value.length]) {
        setLineHeight((prev) => prev - 1); // textarea 높이 줄이고
        setLineBreakIndexDict({
          ...lineBreakIndexDict,
          [event.target.value.length]: 0,
        }); // Dictionary에서 삭제
      }
    }
  };

  // 너비 초과로 인한 줄바꿈 말고 사용자가 엔터를 입력했을 때의 줄바꿈 처리
  const checkItemEnterHandler = (event) => {
    if (event.key === "Enter") {
      // textarea 높이는 checkItemChangeHandler에서 변경됨
      setLineBreakIndexDict({
        ...lineBreakIndexDict,
        [event.target.value.length]: 1,
      }); // 줄바꿈 위치 저장
    }
  };

  console.log(userdata);

  const userdataParse = JSON.parse(userdata);

  console.log(userdataParse);

  return (
    <div className="container">
      <div className="row border-bottom border-dark">
        <div className="col-2 ">
          <span
            className="input-group-text bg-white border-white"
            style={{
              height: lineHeight * 27 + 27 + "px",
              minHeight: "50px",
            }}
          >
            <img
              className="img-fluid rounded-circle w-25"
              src={userdataParse.picture}
              alt=""
            />
            <label className="fs-6 ms-3">{userdataParse.nickName}</label>
          </span>
        </div>
        <div className="col-8">
          <textarea
            id={setReplyAreaId}
            className="form-control border-white"
            aria-label="With textarea"
            onChange={checkItemChangeHandler}
            onKeyDown={checkItemEnterHandler}
            placeholder="댓글 추가"
            style={{
              height: lineHeight * 27 + 27 + "px",
              resize: "none",
              overflow: "hidden",
              minHeight: "50px",
            }}
          ></textarea>
        </div>
        <div className="col-2 d-grid gap-2">
          <button
            className="btn btn-dark"
            onClick={() => {
              const content = document.getElementById(setReplyAreaId).value;

              onclickEvent(
                content,
                userdataParse.id,
                userdataParse.nickName,
                userdataParse.picture,
                boardId,
                replyId
              );
            }}
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}
