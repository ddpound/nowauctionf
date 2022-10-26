import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

import SellerBoardBlockComponent from "./SellerBoardBlockComponent";
import ListPageNation from "../../../components/PageNation/ListPageNation";

/**
 * 판매자의 글을 리스트 받아오는 페이지
 *
 */

export default function SellerBoardListPage({ onePagePostNumber, mallId }) {
  const [commonboardList, setCommonboardList] = useState([]);
  const [postingNumber, setPostingNumber] = useState(onePagePostNumber);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * postingNumber;

  useEffect(() => {
    // 무조건 딱 한번 리스트를 받아와서 페이징해줌
    const requestList = axios.get(
      "/auction-seller/auth/find-all-seller-board/" + mallId
    );
    requestList.then((res) => {
      setCommonboardList(res.data.reverse());
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {commonboardList.length > 0 &&
          commonboardList
            .slice(offset, offset + postingNumber)
            .map((commonboard) => {
              return (
                <SellerBoardBlockComponent
                  key={commonboard.id}
                  boardTitle={commonboard.title}
                  boardId={commonboard.id}
                  thumbnail={commonboard.pictureUrlPath}
                />
              );
            })}

        {commonboardList.length === 0 && (
          <div>
            <p className="h2">등록된 게시글이 없습니다.</p>
          </div>
        )}
      </div>
      {commonboardList.length > 0 && (
        <ListPageNation
          postLength={commonboardList.length}
          oneViewNumber={postingNumber}
          page={page}
          setPage={setPage}
          inMaxPageListNumber={10}
        />
      )}
    </div>
  );
}
