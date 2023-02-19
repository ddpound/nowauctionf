import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import ChatRoomDivComponents from "./ChatRoomDivComponents";

import ListPageNation from "../../../components/PageNation/ListPageNation";

import { Link } from "react-router-dom";
import { requestPostHaveToken } from "../../../commonFuntions/requestHaveToken";

export default function ChatRoomList({ props, onePagePostNumber }) {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [postingNumber, setPostingNumber] = useState(onePagePostNumber);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * postingNumber;

  useEffect(() => {
    // 무조건 딱 한번 리스트를 받아와서 페이징해줌
    const requestList = axios.get("/auction-chat/auth/find-all-chat-room");
    requestList.then((res) => {
      console.log(res);
      console.log(res.data);
      setChatRoomList(res.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2>[현재 경매중인 사이트]</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {chatRoomList.length > 0 &&
          chatRoomList
            .slice(offset, offset + postingNumber)
            .map((chatRoomList) => {
              return (
                <ChatRoomDivComponents
                  key={chatRoomList.roomNum}
                  roomNum={chatRoomList.roomNum}
                  title={chatRoomList.roomTitle}
                  host={chatRoomList.chief}
                  thumbnail={chatRoomList.thumbnail}
                />
              );
            })}

        {chatRoomList.length === 0 && (
          <div>
            <p className="h2">진행중인 경매가 없습니다.</p>
          </div>
        )}
      </div>
      {chatRoomList.length > 0 && (
        <ListPageNation
          postLength={chatRoomList.length}
          oneViewNumber={postingNumber}
          page={page}
          setPage={setPage}
          inMaxPageListNumber={10}
        ></ListPageNation>
      )}
    </div>
  );
}
