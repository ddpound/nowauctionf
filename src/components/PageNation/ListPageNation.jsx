import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

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

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(inMaxPageListNumber);

  const [resultList, setResultList] = useState(middleList.slice(start, end));

  useEffect(() => {
    // 얼마나 반복했는지 횟수 알기위함
    // 즉 현재 페이지, page의 page라 해서 pp

    var fpage = page;
    var fInMaxPageListNumber = inMaxPageListNumber;

    var start = 0;
    var end = inMaxPageListNumber;
    var pp = 0;

    while (fpage > fInMaxPageListNumber) {
      fpage = fpage - fInMaxPageListNumber;
      pp++;
      if (fpage < fInMaxPageListNumber) {
        break;
      }
    }
    // 페이지가 도출됨
    start = inMaxPageListNumber * pp + 1;
    end = inMaxPageListNumber * (pp + 1);

    setStart(start);
    setEnd(end);

    setResultList(middleList.slice(start - 1, end));
  }, [page]);

  return (
    <ul className="pagination  mt-5 justify-content-center">
      <li className="page-item ">
        <button
          className="page-link bg-dark border-dark text-white"
          aria-label="Next"
          onClick={() => {
            setPage(1);
          }}
          disabled={page === 1}
        >
          <span aria-hidden="true">처음</span>
        </button>
      </li>
      <li className="page-item "></li>
      <button
        className="page-link bg-dark border-dark text-white"
        aria-label="Previous"
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        <span aria-hidden="true">이전</span>
      </button>
      {resultList.map((i) => {
        if (i === page) {
          return (
            <li key={i} className="page-item active">
              <button
                className="page-link bg-white border-dark text-dark "
                key={i}
                onClick={() => {
                  setPage(i);
                }}
                aria-current={page === i ? "page" : null}
              >
                {i}
              </button>
            </li>
          );
        } else {
          return (
            <li key={i} className="page-item">
              <button
                className=" page-link bg-dark border-dark text-white "
                key={i}
                onClick={() => {
                  setPage(i);
                }}
                aria-current={page === i ? "page" : null}
              >
                {i}
              </button>
            </li>
          );
        }
      })}
      <li className="page-item">
        <button
          className="page-link bg-dark border-dark text-white"
          aria-label="Next"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === numPages}
        >
          <span aria-hidden="true">다음</span>
        </button>
      </li>

      <li className="page-item">
        <button
          className="page-link bg-dark border-dark text-white"
          aria-label="Next"
          onClick={() => {
            setPage(numPages);
          }}
          disabled={page === numPages}
        >
          <span aria-hidden="true">마지막</span>
        </button>
      </li>
    </ul>
  );
}
