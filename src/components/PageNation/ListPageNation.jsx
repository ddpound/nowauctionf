import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import ListPageNationUL from "./ListPageNationUL";
// 넘어갈 수 있게끔 설계

// 현재 로서는 onclik일때 관리하는 이게 필요하다고 생각이 들었음
// set으로 관리할지 고민

export default function ListPageNation({
  postLength, // 포스트 배열의 길이 (게시판 길이)
  oneViewNumber, // 한 페이지의 보여줄 Number
  page, // 현재페이지
  setPage,
  inMaxPageListNumber, // 예 10이면) 페이지 몇개 이전 1,2,3,4,5,6,7,9,10 다음
}) {
  const [numPages, setNumPages] = useState(
    Math.ceil(postLength / oneViewNumber)
  );

  const middleList = Array(numPages)
    .fill()
    .map((v, i) => i + 1);

  const [resultList, setResultList] = useState(
    middleList.slice(0, inMaxPageListNumber)
  );

  // pp (pagenation의 page라 해서 pp)
  const [pp, setPp] = useState(0);

  const pagenationFunction = (
    page,
    inMaxPageListNumber,
    setResultList,
    middleList,
    pp,
    setPp
  ) => {
    // 예 한번에 10개를 보여줄때 10에 도달했을때 그 이상일 때
    // 페이지네이션의 페이지가 필요함

    // 얼마나 반복했는지 횟수 알기위함
    // 즉 현재 페이지, page의 page라 해서 pp

    var fpage = page;
    var fInMaxPageListNumber = inMaxPageListNumber;

    var start = 0;
    var end = inMaxPageListNumber;
    while (fpage > fInMaxPageListNumber) {
      fpage = fpage - fInMaxPageListNumber;
      pp++;
      if (fpage < fInMaxPageListNumber) {
        break;
      }
    }
    // 페이지가 도출됨
    // 그럼 범위는 whileNum

    start = inMaxPageListNumber * pp + 1;
    end = inMaxPageListNumber * (pp + 1);

    console.log(start + " : " + end);
    setResultList(middleList.slice(start - 1, end));
  };

  const start = inMaxPageListNumber;
  const end = inMaxPageListNumber;

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
              setResultList,
              middleList,
              pp,
              setPp
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
            inMaxPageListNumber,
            setResultList,
            middleList,
            pp,
            setPp
          );
        }}
        disabled={page === 1}
      >
        <span aria-hidden="true">이전</span>
      </button>
      {resultList.map((i) => (
        <li key={i} className="page-item">
          <button
            className="page-link"
            key={i}
            onClick={() => {
              setPage(i);
              return pagenationFunction(
                page,
                inMaxPageListNumber,
                setResultList,
                middleList,
                pp,
                setPp
              );
            }}
            aria-current={page === i ? "page" : null}
          >
            {i}
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
              inMaxPageListNumber,
              setResultList,
              middleList,
              pp,
              setPp
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
              setResultList,
              middleList,
              pp,
              setPp
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
