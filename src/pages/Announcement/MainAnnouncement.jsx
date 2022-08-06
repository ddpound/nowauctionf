import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardBlock from "./AnnouncementComponents/BoardBlock";
import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

// 내가 직접만든 페이지네이션 양식
import ListPageNation from "../../components/PageNation/ListPageNation";

export default function MainAnnouncement(props) {
  const [announcementList, setList] = useState([]); // 빈 배열

  const [oneViewNumber, setOneViewNumber] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * oneViewNumber;

  const adminIn = localStorage.getItem("adminSuccess", "imadmin");

  useEffect(() => {
    // 자동적으로 리스트 반환
    const requestList = axios
      .get("/find-all-announcement-board")
      .then((res) => {
        setList(res.data.reverse());
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div className="container mt-5">
      {announcementList.length === 0 && <div>공지글이 없습니다</div>}

      {announcementList.length > 0 &&
        announcementList
          .slice(offset, offset + oneViewNumber)
          .map((announcement) => {
            return (
              <BoardBlock
                announcement={announcement}
                key={announcement.id}
              ></BoardBlock>
            );
          })}

      <ListPageNation
        postLength={announcementList.length}
        oneViewNumber={oneViewNumber}
        page={page}
        setPage={setPage}
        inMaxPageListNumber={10}
      />
      {!!adminIn && (
        <Link className="btn btn-dark" to="/announcement-write">
          글쓰기
        </Link>
      )}
    </div>
  );
}
