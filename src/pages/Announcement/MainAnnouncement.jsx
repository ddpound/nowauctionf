import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardBlock from "./AnnouncementComponents/BoardBlock";
import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

export default function MainAnnouncement(props) {
  const [announcementList, setList] = useState([]); // 빈 배열

  const adminIn = localStorage.getItem("adminSuccess", "imadmin");

  useEffect(() => {
    // 자동적으로 리스트 반환
    const requestList = axios
      .get("/find-all-announcement-board")
      .then((res) => {
        setList(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div className="container mt-5">
      {announcementList.length === 0 && <div>공지글이 없습니다</div>}

      {announcementList.length > 0 &&
        announcementList.map((announcement) => {
          return (
            <BoardBlock
              announcement={announcement}
              key={announcement.id}
            ></BoardBlock>
          );
        })}

      {!!adminIn && (
        <Link className="btn btn-dark" to="/announcement-write">
          글쓰기
        </Link>
      )}
    </div>
  );
}
