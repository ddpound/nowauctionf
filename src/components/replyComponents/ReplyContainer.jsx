import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import ReplyBlock from "./ReplyBlock";

/**
 * 1. get요청해서 댓글 리스트를 받아낼 url
 * 2. post요청해서 댓글 작성을 받아낼 url
 * 3. delete 요청해서 삭제할 url
 */

export default function ReplyContainer({
  repleyGetUrl,
  replySavePostUrl,
  userdata,
  inputReplylist,
}) {
  const [replyList, setReplyList] = useState();
  const [newAndOld, setNewAndOld] = useState(1);

  useEffect(() => {
    setReplyList(inputReplylist);
  }, []);

  useEffect(() => {
    setNewAndOld(newAndOld);
  }, [newAndOld]);

  const nowStateChange = (number) => {
    setNewAndOld(number);
  };

  console.log("여기가 댓글");
  console.log(replyList);
  console.log(newAndOld);
  return (
    <div className="container">
      <div
        className="btn-group ms-2 mt-2"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          onClick={() => {
            nowStateChange(1);
          }}
        />
        <label className="btn btn-outline-warning btn-dark" htmlFor="btnradio1">
          최신댓글
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          onClick={() => {
            nowStateChange(2);
          }}
        />
        <label className="btn btn-outline-warning btn-dark" htmlFor="btnradio2">
          인기 댓글
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autoComplete="off"
          onClick={() => {
            nowStateChange(3);
          }}
        />
        <label className="btn btn-outline-warning btn-dark" htmlFor="btnradio3">
          오래된 댓글
        </label>
      </div>
      {!!replyList &&
        newAndOld == 1 &&
        replyList.map((reply) => {
          return (
            <ReplyBlock key={reply.id} reply={reply} userdata={userdata} />
          );
        })}
      {!!replyList &&
        newAndOld == 3 &&
        replyList.reverse().map((reply) => {
          return (
            <ReplyBlock key={reply.id} reply={reply} userdata={userdata} />
          );
        })}
    </div>
  );
}
