import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

// 페이지 버튼 누르는 곳

// 최대 페이지 버튼은 10개, 한글당 5개 정도 생각중

// 게시판이 너무 많아서 페이지 버튼 10개를 넘을시 다음버튼을 눌러

// 넘어갈 수 있게끔 설계

export default function ListPageNation({
  postLength, // 포스트 배열의 길이 (게시판 길이)
  oneViewNumber, // 한 페이지의 보여줄 Number
  page, // 현재페이지
  setPage,
  maxPageListNumber, // 예 10이면) 페이지 몇개 이전 1,2,3,4,5,6,7,9,10 다음
}) {
  // 즉 페이지의 총 갯수를 나타냄 한페이에 10개를 보여준다했을때 215개가 들어오면
  // 215 / 10 + 1 = 즉 소수점제외 22가됨
  // 총 페이지 갯수
  const totalPageNumber = postLength / oneViewNumber + 1;

  // 이 토탈 페이지 넘버를 통해서 다시 재 페이징을 해주면됨
  const pagenaitionofPaging = totalPageNumber / maxPageListNumber + 1;

  // 즉 페이지네이션의 현재 페이지
  const pageNationOfpage = 1;

  return (
    <ul className="pagination mt-5 justify-content-center">
      <li className="page-item"></li>
      <button
        className="page-link"
        aria-label="Previous"
        onClick={() => setPage(1)}
        disabled={page === 1}
      >
        <span aria-hidden="true">처음</span>
      </button>
      <button
        className="page-link"
        aria-label="Previous"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <span aria-hidden="true">이전</span>
      </button>
      {Array(maxPageListNumber)
        .fill()
        .map((_, i) => (
          <li key={i + 1} className="page-item">
            <button
              className="page-link"
              key={i + 1}
              onClick={() => setPage(i + 1)}
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
          onClick={() => setPage(page + 1)}
          disabled={page === totalPageNumber}
        >
          <span aria-hidden="true">다음</span>
        </button>
      </li>
      <li className="page-item">
        <button
          className="page-link"
          aria-label="Next"
          onClick={() => setPage(postLength)}
          disabled={page === totalPageNumber}
        >
          <span aria-hidden="true">마지막</span>
        </button>
      </li>
    </ul>
  );
}
