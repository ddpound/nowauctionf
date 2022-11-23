import axios from "axios";
import { React, useState, useEffect, useRef, Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { useInView } from "react-intersection-observer";

import ReplyBlock from "./ReplyBlock";
import { useCallback } from "react";

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
  // 전체 페이지
  const [replyList, setReplyList] = useState([]);

  const [newAndOld, setNewAndOld] = useState(1);

  // 페이징할 리스트 계속 +20 씩 넣을 예정 page가 변환할때 마다
  const [pagingList, setPagingList] = useState([]);

  // 로딩중...
  const [loading, setLoading] = useState(false);

  // 페이지
  const [page, setPage] = useState(1);

  // 페이징 할 값
  const pageNumber = 5;

  const [ref, inView] = useInView();

  // observer 사용, 해당 div가 보이면 view 로 작동됨
  useEffect(() => {
    setReplyList(inputReplylist);

    // 시작하자마자 받아내야함
    setPagingList(inputReplylist.slice(0, pageNumber));
  }, []);

  const chageList = useCallback(async () => {
    if (page > replyList.length) {
    } else {
      setLoading(true);
      // 1~5, 6~10, 11~15,
      console.log("시작 페이지");
      console.log(page - 1);
      console.log("끝 페이지");
      console.log(page + pageNumber);
      setPagingList((prevState) => [
        ...prevState,
        ...replyList.slice(page - 1, page - 1 + pageNumber),
      ]);
      setLoading(false);
    }
  }, [page]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    chageList();
  }, [chageList]);

  useEffect(() => {
    setNewAndOld(newAndOld);
  }, [newAndOld]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    // 페이지 +1 해줌
    if (inView && !loading && page < replyList.length) {
      setPage((prevState) => prevState + pageNumber);
    }
  }, [inView, loading]);

  const nowStateChange = (number) => {
    setNewAndOld(number);
  };

  console.log("여기가 댓글");
  console.log(pagingList);
  // console.log(replyList);
  // console.log(newAndOld);
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
      {!!pagingList &&
        newAndOld == 1 &&
        pagingList.map((list) => {
          return (
            <Fragment key={list.id}>
              <ReplyBlock key={list.id} reply={list} userdata={userdata} />
            </Fragment>
          );
        })}
      {!!pagingList &&
        newAndOld == 3 &&
        pagingList.reverse().map((list) => {
          return (
            <Fragment key={list.id}>
              <ReplyBlock key={list.id} reply={list} userdata={userdata} />
            </Fragment>
          );
        })}

      {!!pagingList && <div ref={ref}> 마지막이 되어야함 </div>}
    </div>
  );
}
