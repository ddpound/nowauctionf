import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

// 비동기로 돌아가는 페이지 네이션을 위해 한계층 더 파내려갔다 생각하면됨
export default function ListPageNationUL({
  setPage,
  pagenationFunction,
  page,
  inMaxPageListNumber,
  setResultList,
  middleList,
  resultList,
  numPages,
}) {
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
              middleList
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
            middleList
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
              pagenationFunction(
                page,
                inMaxPageListNumber,
                setResultList,
                middleList
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
              middleList
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
              middleList
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
