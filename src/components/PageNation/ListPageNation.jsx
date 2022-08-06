import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

// 페이지 버튼 누르는 곳

// 최대 페이지 버튼은 10개, 한글당 5개 정도 생각중

// 게시판이 너무 많아서 페이지 버튼 10개를 넘을시 다음버튼을 눌러

// 넘어갈 수 있게끔 설계

// 현재 로서는 onclik일때 관리하는 이게 필요하다고 생각이 들었음
function pagenationFunction(
  page,
  maxPageListNumber,
  setMaxPageListNumber,
  preMaxListNumber,
  setPreMaxListNumber,
  pagenaitionPage,
  fixMaxPageListNumber
) {
  // 예 한번에 10개를 보여줄때 10에 도달했을때 그 이상일 때
  // 페이지네이션의 페이지가 필요함
  if (page >= maxPageListNumber) {
    setMaxPageListNumber(fixMaxPageListNumber * pagenaitionPage);
    setPreMaxListNumber(preMaxListNumber + maxPageListNumber);

    console.log("도달");
    console.log(preMaxListNumber);
    console.log(maxPageListNumber);
  }
}

export default function ListPageNation({
  postLength, // 포스트 배열의 길이 (게시판 길이)
  oneViewNumber, // 한 페이지의 보여줄 Number
  page, // 현재페이지
  setPage,
  inMaxPageListNumber, // 예 10이면) 페이지 몇개 이전 1,2,3,4,5,6,7,9,10 다음
}) {
  const numPages = Math.ceil(postLength / oneViewNumber);

  // 당연히 1페이지
  const [pagenaitionPage, setPagenaitionPage] = useState(1);

  // 고정값
  const fixMaxPageListNumber = inMaxPageListNumber;

  const [preMaxListNumber, setPreMaxListNumber] = useState(0);

  const [maxPageListNumber, setMaxPageListNumber] =
    useState(inMaxPageListNumber);

  const [resultList, setResultList] = useState(
    Array(numPages).fill().slice(preMaxListNumber, maxPageListNumber)
  );

  return (
    <ul className="pagination mt-5 justify-content-center">
      <li className="page-item">
        <button
          className="page-link"
          aria-label="Next"
          onClick={() => {
            setPage(1);
            pagenationFunction(
              page,
              inMaxPageListNumber,
              setMaxPageListNumber,
              preMaxListNumber,
              setPreMaxListNumber,
              pagenaitionPage,
              fixMaxPageListNumber
            );
          }}
          disabled={page === 1}
        >
          <span aria-hidden="true">처음</span>
        </button>
      </li>
      <li className="page-item"></li>
      <button
        className="page-link"
        aria-label="Previous"
        onClick={() => {
          setPage(page - 1);
          pagenationFunction(
            page,
            maxPageListNumber,
            setMaxPageListNumber,
            preMaxListNumber,
            setPreMaxListNumber,
            pagenaitionPage,
            fixMaxPageListNumber
          );
        }}
        disabled={page === 1}
      >
        <span aria-hidden="true">이전</span>
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <li key={i + 1} className="page-item">
            <button
              className="page-link"
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
                pagenationFunction(
                  page,
                  maxPageListNumber,
                  setMaxPageListNumber,
                  preMaxListNumber,
                  setPreMaxListNumber,
                  pagenaitionPage,
                  fixMaxPageListNumber
                );
              }}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          </li>
        ))}
      <li className="page-item">
        <button
          className="page-link"
          aria-label="Next"
          onClick={() => {
            setPage(page + 1);
            pagenationFunction(
              page,
              maxPageListNumber,
              setMaxPageListNumber,
              preMaxListNumber,
              setPreMaxListNumber,
              pagenaitionPage,
              fixMaxPageListNumber
            );
          }}
          disabled={page === numPages}
        >
          <span aria-hidden="true">다음</span>
        </button>
      </li>
      <li className="page-item">
        <button
          className="page-link"
          aria-label="Next"
          onClick={() => {
            setPage(numPages);
            pagenationFunction(
              page,
              inMaxPageListNumber,
              setMaxPageListNumber,
              preMaxListNumber,
              setPreMaxListNumber,
              pagenaitionPage,
              fixMaxPageListNumber
            );
          }}
          disabled={page === numPages}
        >
          <span aria-hidden="true">마지막</span>
        </button>
      </li>
    </ul>
  );
}
